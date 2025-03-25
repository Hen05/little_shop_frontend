import {useEffect, useState} from "react";
import api from "../../services/api.js";
import './style.css';

function Cart(){
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);

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

    useEffect(() => {
        async function fetchItems() {
            const fetchedItems = await getItems();
            setItems(fetchedItems);
        }
        fetchItems();
    }, []);

    function handleSearch(e) {
        setSearchTerm(e.target.value.toLowerCase());
    }

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.price.toString().includes(searchTerm) ||
        item.stock.toString() === (("indisponivel".includes(searchTerm) ? '0' : searchTerm))
    );

    function handleAddToCart(target) {
        const itemId = target.parentElement.parentElement.id;
        const item = items.find(item => item._id == itemId);
        const isItemSelected = selectedItem.find(item => item.id == itemId);

        if (isItemSelected) {
            setSelectedItem(prevItems =>
                prevItems.map(item =>
                    item.id === itemId
                        ? { ...item, amount: Number(item.amount) + 1 }  // Incrementa a quantidade
                        : item
                )
            );
        } else {
            const newItem = {
                id: itemId,
                name: item.name,
                price: item.price,
                amount: 1
            };

            setSelectedItem(prevItems => [...prevItems, newItem]);  // Adiciona o novo item
        }
    }

    return (
        <div className={'sellContainer'}>
            <form>
                <label>Pesquisar item</label>
                <input
                    placeholder="Nome, Tipo, Preço, Etc..."
                    onChange={handleSearch}
                    value={searchTerm}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Adicionar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index} id={item._id}>
                            <td>{item.name}</td>
                            <td>R${item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className={'addBtn'} type="button" onClick={(e) => handleAddToCart(e.target)}>
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </form>
            <div className={'cartContainer'}>
                <h3>Carrinho de Compras</h3>
                <table>
                    <ul>
                    {selectedItem.map((item, index) => (
                        <li key={index} id={item.id}>
                            <div className={'carImg'}></div>
                            <div className={'carName'}>{item.name}</div>
                            <div className={'carPrice'}>{item.price}</div>
                            <div className={'carAmount'}>
                                <input
                                    id={'amount'}
                                    type={'number'}
                                    value={item.amount}
                                    onChange={(e) => {
                                        const newAmount = e.target.value;
                                        const id = e.target.parentElement.parentElement.id;
                                        setSelectedItem(prevItems =>
                                            prevItems.map(item =>
                                                item.id === id
                                                    ? { ...item, amount: newAmount }  // Atualiza o amount do item
                                                    : item
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                    </ul>
                </table>
            </div>

        </div>
    )
}

export default Sell;