import { useEffect, useState } from "react";
import api from "../../services/api.js";
import './style.css';

function AddItems({onAddItems, onError}) {
    const [imageLink, setImageLink] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [initialStock, setInitialStock] = useState(0);
    const [itemTypes, setItemTypes] = useState([]);
    const [showOtherType, setShowOtherType] = useState(false);

    async function getItemsTypes() {
        try {
            const response = await api.get('/item/types');
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
        async function fetchTypes() {
            const fetchedTypes = await getItemsTypes();
            setItemTypes(fetchedTypes);
        }
        fetchTypes();
    }, []);

    function handleAddItem(e) {
        e.preventDefault();
        const data = {
            image: imageLink,
            name,
            type,
            price,
            stock: initialStock
        };
        api.post('/item', data)
            .then(response => {
                if(response.status === 200) {
                    onAddItems();
                    setImageLink("");
                    setName("");
                    setType("");
                    setPrice(0);
                    setInitialStock(0);
                    setShowOtherType(false);
                } else {
                    throw new Error(response.data);
                }
            })
            .catch(error => {
                onError('Could not add item', error);
            });
    }

    return (
        <div className={'addItemsContainer'}>
            <h1>Adicionar Item</h1>
            <form onSubmit={handleAddItem}>
                <div className={'imageContainer'}>
                    {imageLink && (
                        <img className={'exampleImage'} src={imageLink} alt={'Sem Imagem'}/>
                    )}
                    <input
                        value={imageLink}
                        onChange={e => setImageLink(e.target.value)}
                        type={'text'}
                        placeholder={'Link da Imagem'}
                    />
                </div>
                <input
                    value={name}
                    required={true}
                    onChange={e => setName(e.target.value)}
                    type={'Text'}
                    placeholder="Nome do Item"
                />
                <select
                    value={type}
                    required={true}
                    onChange={e => {
                        const selectedValue = e.target.value;
                        setType(selectedValue);
                        setShowOtherType(selectedValue === 'Outro');
                    }}
                >
                    {itemTypes.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                    <option value="Outro">Outro</option>
                </select>
                {showOtherType && (
                    <input
                        required={true}
                        value={type}
                        onChange={e => setType(e.target.value)}
                        type={'Text'}
                        placeholder={'Tipo do Item'}
                    />
                )}
                <div className={'labelInputContainer'}>
                    <label>Preço</label>
                    <input
                        value={price}
                        required={true}
                        onChange={e => setPrice(Number(e.target.value))}
                        type={'Number'}
                        placeholder="Preço"
                        step={'any'}
                    />
                </div>
                <div className={'labelInputContainer'}>
                    <label>Estoque</label>
                    <input
                        value={initialStock}
                        required={true}
                        onChange={e => setInitialStock(Number(e.target.value))}
                        type={'Number'}
                        placeholder="Estoque Inicial"
                    />
                </div>
                    <button type="submit">Adicionar</button>
            </form>
        </div>
);
}

export default AddItems;