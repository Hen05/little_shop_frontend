import './style.css';
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function AddStock() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [stockValues, setStockValues] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    async function getItems() {
        try {
            const response = await api.get('/item');
            if (response.status === 200) {
                return response.data;
            } else {
                alert("Something went wrong! Cannot get Items");
                return [];
            }
        } catch (error) {
            console.error("Error fetching items:", error);
            alert("Something went wrong! Cannot get Items");
            return [];
        }
    }

    async function fetchItems() {
        const fetchedItems = await getItems();
        fetchedItems.sort((a, b) => a.stock - b.stock);
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    function handleStockChange(itemId, value) {
        setStockValues({ ...stockValues, [itemId]: value });
    }

    function handleSearch(e) {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredItems(items.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.type.toLowerCase().includes(term) ||
            item.stock.toString().includes(term)
        ));
    }

    function addStock(itemId) {
       const value = stockValues[itemId] || 0;
       const item = items.find(item => item._id === itemId);
       if(value >= 0){
           const data = {
               stock: Number(item.stock) + Number(value)
           }
           api.put(`/item/${itemId}`, data).then(res => {
               if(res.status === 200){
                   console.log('Atualizado com sucesso');
                   handleStockChange(itemId, 0);
                   fetchItems();
               }else{
                   alert('Something went wrong! Cannot get Items');
               }
           })
       }
    }

    function addStockToAll() {
        for(const itemId in stockValues){
            addStock(itemId);
        }

        setStockValues({});

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        })
    }

    return (
        <div>
            <label>Pesquisar item</label>
            <input
                placeholder="Nome, Tipo, Estoque, Etc..."
                onChange={handleSearch}
                value={searchTerm}
            />
            <button onClick={addStockToAll} className="add-all-button">Adicionar de todos</button>
            <table className="item-table">
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Estoque Atual</th>
                    <th>Novo Estoque</th>
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
                            <td>{item.stock}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Quantidade"
                                    value={stockValues[item._id] || ""}
                                    onChange={(e) => handleStockChange(item._id, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => addStock(item._id)} className="add-stock-button">Adicionar Stock</button>
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

export default AddStock;