import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './completedSales.css';

const CompletedSalesPage = () => {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    const fetchSales = async () => {
        try {
            const response = await api.get('/sales');
            setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleDetailClick = (saleId) => {
        navigate(`/sale-detail/${saleId}`);
    };

    return (
        <div className="completed-sales-container">
            <h1>Ventas Realizadas</h1>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Vendedor</th>
                        <th>Fecha</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.User.name}</td>
                            <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                            <td>${sale.totalAmount}</td>
                            <td>
                                <button className="view-details-button" onClick={() => handleDetailClick(sale.id)}>
                                    Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompletedSalesPage;
