import './style.css';
import {useEffect, useState} from "react";
import api from "../../services/api.js";
import SalesHistory from "./SalesHistory/index.jsx";

function ViewGraphics(){
    const [sales, setSales] = useState([]);

    async function getSales() {
        try {
            const response = await api.get('/sales');
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


    useEffect(()=>{
        async function loadSales(){
            const newSales = await getSales();
            setSales(newSales);
        }
        loadSales();
    }, [])

    return (
        <div>
            <h1>Historico de Vendas</h1>
            <SalesHistory sales={sales}/>
        </div>
    )
}

export default ViewGraphics;