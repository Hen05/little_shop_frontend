import './style.css';
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function UpdatePrice() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [priceValues, setPriceValues] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    async function getItems() {
        try {
            const response = await api.get('/item');
            if (response.status === 200) {
                return response.data;
            } else {
                alert("Algo deu errado! Não foi possível obter os itens.");
                return [];
            }
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            alert("Algo deu errado! Não foi possível obter os itens.");
            return [];
        }
    }

    async function fetchItems() {
        const fetchedItems = await getItems();
        fetchedItems.sort((a, b) => b.price - a.price);
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    function handlePriceChange(itemId, value) {
        setPriceValues({ ...priceValues, [itemId]: value });
    }

    function handleSearch(e) {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredItems(items.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.type.toLowerCase().includes(term) ||
            item.price.toString().includes(term)
        ));
    }

    function updatePrice(itemId) {
        const value = priceValues[itemId] || 0;
        const item = items.find(item => item._id === itemId);
        if(value >= 0){
            const data = {
                actualPrice: false
            }
            api.put(`/item/${itemId}`, data).then(res => {
                if(res.status === 200){
                    console.log('atualizado')
                    const newData = {
                        image: item.image,
                        name: item.name,
                        type: item.type,
                        price: value,
                        stock: item.stock,
                        actualPrice: true
                    }

                    api.post('/item', newData).then(res => {
                        if(res.status === 200){
                            fetchItems();
                        } else{
                            alert('Something went wrong adding data')
                        }
                    });

                } else{
                    alert('Something went wrong updating data')
                }
            })
        }
    }

    function updatePriceForAll() {
        for(const itemId in priceValues){
            updatePrice(itemId);
        }
    }

    return (
        <div>
            <label>Pesquisar item</label>
            <input
                placeholder="Nome, Tipo, Preço, Etc..."
                onChange={handleSearch}
                value={searchTerm}
            />
            <button onClick={updatePriceForAll} className="update-all-button">Atualizar todos os preços</button>
            <table className="item-table">
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Preço Atual</th>
                    <th>Novo Preço</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <div className="itemImage" style={{ backgroundImage: `url(${item.image})` }}></div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.price}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Novo Preço"
                                    value={priceValues[item._id] || ""}
                                    onChange={(e) => handlePriceChange(item._id, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => updatePrice(item._id)} className="update-price-button">Atualizar Preço</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Nenhum item encontrado.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default UpdatePrice;