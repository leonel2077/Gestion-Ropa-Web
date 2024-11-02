import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './saleDetail.css';

const SaleDetail = () => {
    const { saleId } = useParams();
    const [saleDetails, setSaleDetails] = useState(null);

    const fetchSaleDetails = async () => {
        try {
            const response = await api.get(`/sale-detail/filter/${saleId}`);
            setSaleDetails(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching sale details:", error);
        }
    };

    useEffect(() => {
        fetchSaleDetails();
    }, [saleId]);

    if (!saleDetails) {
        return <div>Loading...</div>;
    }

    const { totalAmount, SaleDetails = [] } = saleDetails;

    return (
        <div className="sale-detail-container">
            <h1>Detalles de la Venta #{saleId}</h1>
            <table className="sale-detail-table">
                <thead>
                    <tr>
                        <th>Nombre de la Prenda</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {SaleDetails.map((detail) => (
                        <tr key={detail.id}>
                            <td>{detail.Clothe.name}</td>
                            <td>{detail.quantity}</td>
                            <td>${detail.price}</td>
                            <td>${(detail.price * detail.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="total-label">Total de la Venta:</td>
                        <td className="total-amount">${totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default SaleDetail;
