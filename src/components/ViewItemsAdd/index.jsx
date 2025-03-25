import api from "../../services/api.js";
import { useEffect, useState } from "react";
import './style.css';

function ViewItems({addItem}) {
    const [items, setItems] = useState([]);
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

    return (
        <div>
            <label>Pesquisar item</label>
            <input
                placeholder="Nome, Tipo, Preço, Etc..."
                onChange={handleSearch}
                value={searchTerm}
            />
            <div className="container">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div className="item" key={index} id={item._id}>
                            <div
                                className="itemImage"
                                style={{backgroundImage: `url(${item.image})`}}
                            >
                            </div>
                            <p className="itemName">{item.name}</p>
                            <p className="itemType">{item.type}</p>
                            <p className="itemPrice">R${item.price}</p>
                            <p className="itemStock">
                                {item.stock <= 0 ? "Indisponível" : `Disponibilidade: ${item.stock}`}
                            </p>
                            <div className={"addCartBtn"} onClick={e=>addItem(e.target)}>+</div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum item encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default ViewItems;
