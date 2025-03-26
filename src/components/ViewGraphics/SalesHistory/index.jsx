import React, { useEffect, useState } from 'react';

const SalesHistory = ({ sales }) => {
    const [filteredSales, setFilteredSales] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

    function formatDate(date) {
        const splittedDate = date.split("-");
        if(splittedDate.length === 1) {
            return date;
        }
        return splittedDate[2] + "/" +
            splittedDate[1] + "/" +
            splittedDate[0];
    }

    const filterSalesByDate = (date) => {
        const formattedDate = formatDate(date);
        const filtered = sales.filter(sale => {
            const saleDate = new Date(sale.date).toLocaleDateString();
            return formattedDate === saleDate;
        });
        setFilteredSales(filtered);
    };

    const calculateTotalSale = (items) => {
        return items.reduce((total, item) => total + (item.item.price * item.amount), 0);
    };

    const calculateTotalDay = () => {
        return filteredSales.reduce((total, sale) => total + calculateTotalSale(sale.items), 0);
    };

    useEffect(() => {
        filterSalesByDate(new Date().toLocaleDateString());
    }, [sales]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        filterSalesByDate(event.target.value);
    };

    return (
        <div>
            <h2>Histórico de Vendas</h2>
            <div>
                {/* Seletor de data */}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{marginBottom: '20px', padding: '10px'}}
                />
                <div style={{borderBottom: '1px solid #ccc', marginBottom: '20px'}}>
                    <h3><strong>Total do Dia:</strong> R$ {calculateTotalDay().toFixed(2)}</h3>
                </div>
                <div>
                    {filteredSales.length > 0 ? (
                        filteredSales.map(sale => (
                            <div key={sale.saleId} style={{borderBottom: '1px solid #ccc', marginBottom: '20px'}}>
                                <p><strong>Data:</strong> {new Date(sale.date).toLocaleString()}</p>
                                <p><strong>Método de Pagamento:</strong> {sale.paymentMethod}</p>
                                <div>
                                    <h4>Itens</h4>
                                    {sale.items.map((item, index) => (
                                        <div key={index} style={{marginBottom: '10px'}}>
                                            <p><strong>Produto:</strong> {item.item.name}</p>
                                            <p><strong>Quantidade:</strong> {item.amount}</p>
                                            <p><strong>Preço Unitário:</strong> R$ {item.item.price}</p>
                                            <p><strong>Total:</strong> R$ {item.item.price * item.amount}</p>
                                        </div>
                                    ))}
                                </div>
                                <p><strong>Total da Venda:</strong> R$ {calculateTotalSale(sale.items).toFixed(2)}</p>
                            </div>
                        ))
                    ) : (
                        <p>Não há vendas para esta data.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesHistory;
