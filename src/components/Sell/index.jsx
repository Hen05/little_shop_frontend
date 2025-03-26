import {useEffect, useState} from "react";
import ViewItemsAdd from "../ViewItemsAdd/index.jsx";
import Cart from "../Cart/index.jsx";
import api from "../../services/api.js";
import './style.css';

function Sell() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);

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
        setItems(fetchedItems);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    async function updateItems(){
        const newItems = await getItems();
        setItems(newItems);
        console.log(newItems);
        console.log(test);
    }

    function addItem(target) {
        const id = target.parentNode.id;
        const itemToAdd = items.find(item => item._id === id);

        if (!itemToAdd) return;

        setSelectedItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === id);

            if (existingItem) {
                if(existingItem.amount < existingItem.stock){
                    return prevItems.map(item =>
                        item.id === id ? { ...item, amount: item.amount + 1 } : item
                    );
                }
                return prevItems;
            } else {
                // Adiciona um novo item ao carrinho
                return [...prevItems, {
                    id: itemToAdd._id,
                    image: itemToAdd.image,
                    name: itemToAdd.name,
                    price: itemToAdd.price,
                    amount: 1,
                    stock: itemToAdd.stock
                }];
            }
        });
    }

    return (
        <div className={'sellContainer'}>
            <div className={'viewItemsContainer'}>
                <ViewItemsAdd addItem={addItem} items={items}/>
            </div>
            <div className={'cartContainer'}>
                <Cart selectedItems={selectedItems} setSelectedItems={setSelectedItems} fetchItems={updateItems}/>
            </div>
        </div>
    );
}

export default Sell;