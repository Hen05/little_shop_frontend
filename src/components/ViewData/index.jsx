import './style.css';
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function ViewData() {
    const [sales, setSales] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [filteredSales, setFilteredSales] = useState([]);

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await api.get('/sales');
                if (response.status === 200) {
                    setSales(response.data);
                } else {
                    alert("Erro ao buscar vendas");
                }
            } catch (error) {
                console.error("Erro ao buscar vendas:", error);
                alert("Erro ao buscar vendas");
            }
        }
        fetchSales();
    }, []);

    useEffect(() => {
        filterSalesByMonth(selectedMonth);
    }, [sales, selectedMonth]);

    function filterSalesByMonth(month) {
        const filtered = sales.filter(sale => sale.date.startsWith(month));
        setFilteredSales(filtered);
    }

    function calculateTotalSales() {
        return filteredSales.reduce((total, sale) => total + sale.items.reduce((sum, item) => sum + (item.item.price * item.amount), 0), 0);
    }

    function calculateTotalTransactions() {
        return filteredSales.length;
    }

    function calculateAverageTicket() {
        return filteredSales.length > 0 ? calculateTotalSales() / filteredSales.length : 0;
    }

    return (
        <div>
            <h1>Visão Geral das Vendas Mensais</h1>
            <label>Selecione o mês: </label>
            <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px' }}
            />
            <div style={{ marginBottom: '20px' }}>
                <h3><strong>Total de Vendas:</strong> R$ {calculateTotalSales().toFixed(2)}</h3>
                <h3><strong>Quantidade de Vendas:</strong> {calculateTotalTransactions()}</h3>
                <h3><strong>Ticket Médio:</strong> R$ {calculateAverageTicket().toFixed(2)}</h3>
            </div>
            <div>
                <h2>Detalhes das Vendas</h2>
                <table border="1" width="100%" style={{ marginTop: '20px' }}>
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Método de Pagamento</th>
                        <th>Total da Venda</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSales.length > 0 ? (
                        filteredSales.map((sale, index) => (
                            <tr key={index}>
                                <td>{new Date(sale.date).toLocaleDateString()}</td>
                                <td>{sale.paymentMethod}</td>
                                <td>R$ {sale.items.reduce((sum, item) => sum + (item.item.price * item.amount), 0).toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhuma venda encontrada para este mês.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewData;