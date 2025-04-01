import {useEffect, useState} from "react";
import './style.css';
import {formatToReal} from "../../services/formatter.js";
import FinishBuy from './FinishBuy';
import api from "../../services/api.js";

function Cart({ selectedItems = [], setSelectedItems, fetchItems}) {
    const [total, setTotal] = useState(0);
    const [isFinishBuy, setIsFinishBuy] = useState(false);

    useEffect(() => {
        console.log(selectedItems);
        setTotal(selectedItems.reduce((total, item) => total + (item.price * item.amount) , 0));
    }, [selectedItems])
    
    function handleFinishBuy(){
        if(total !== 0){
            setIsFinishBuy(true);
        }
    }

    function handleCancelFinishBuy(){
        setIsFinishBuy(false);
    }

    function finishBuy(){
        const paymentMethod = document.querySelector('.finishArea select').value

        if(paymentMethod === 'Selecione a forma de pagamento'){
            return;
        }

        const itemsData = selectedItems.map(
            (item) => {
                return {
                    'itemId': item.id,
                    'quantity': item.amount
                }
            }
        )

        const data = {
            itemsData,
            paymentMethod
        }

        setIsFinishBuy(false);
        setSelectedItems([]);

        api.post('/sales', data).then(res => {
            alert('Compra realizada com sucesso!')
            console.log(res);
            fetchItems();
        }).catch(err => {
            alert('Deu erro');
            console.log(err);
        })
    }

    return (
        <div className={'container10'}>
            {isFinishBuy && <FinishBuy finishBuy={finishBuy} cartItems={selectedItems} cancelBuy={handleCancelFinishBuy}/>}
            <h1>Carrinho de Compras</h1>
            <div className={'cartContainer'}>
                <div className={'cartItemsContainer'}>
                    {selectedItems.map((item, index) => (
                        <div className={'cartItem'} index={index} id={item.id}>
                            <div
                                className={'cartItemImg'}
                                style={{backgroundImage: `url('${item.image}')`}}>
                            </div>
                            <div className={'cartInfos'}>
                                <div className={'cartItemName'}>{item.name}</div>
                                <div className={'cartItemPrice'}>{formatToReal(item.price)}</div>
                                <input
                                    className="cartItemAmount"
                                    value={item.amount === "" ? "" : item.amount}
                                    max={item.stock}
                                    type="number"
                                    onChange={e => {
                                        let value = e.target.value.trim();

                                        while (value.length > 1 && value[0] === '0') {
                                            value = value.slice(1);
                                        }

                                        if (value === '') {
                                            setSelectedItems(prevItems =>
                                                prevItems.map(i =>
                                                    i.id === item.id ? {...i, amount: ""} : i
                                                )
                                            );
                                            return;
                                        }

                                        const newAmount = Number(value);

                                        if (isNaN(newAmount) || newAmount < 1) return;

                                        setSelectedItems(prevItems =>
                                            prevItems.map(i =>
                                                i.id === item.id ? {...i, amount: newAmount} : i
                                            )
                                        );
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === "Backspace" && item.amount === "") {
                                            setSelectedItems(prevItems => prevItems.filter(i => i.id !== item.id));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
               </div>
            </div>
            <button onClick={handleFinishBuy}>Total: R${total}</button>
        </div>
    );
}

export default Cart;