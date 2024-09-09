import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../service/ProductService';
import './CardDetails.css'; // Importar o CSS para a página de detalhes

const CardDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                
                const products = ProductService();
                const productName = products.find(p => p.id === parseInt(id))?.name;

                if (!productName) {
                    throw new Error('Product not found in the local list');
                }

                const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(productName)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    setProduct(data.data[0]);
                } else {
                    setError('Card not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Card not found</div>;
    }

    return (
        <div className="card-details-container">
            <h1>{product.name}</h1>
            <div className="card-details-content">
                <img 
                    src={product.card_images && product.card_images[0] ? product.card_images[0].image_url : ''} 
                    alt={product.name} 
                    className="card-image" 
                />
                <div className="card-info">
                    <p><strong>Rating:</strong> {product.card_ratings && product.card_ratings[0] ? product.card_ratings[0].rating : 'N/A'}</p>
                    <p><strong>Category:</strong> {product.type || 'N/A'}</p>
                    <p><strong>Price:</strong> ${product.card_prices && product.card_prices[0] ? product.card_prices[0].price : 'N/A'}</p>
                    <p><strong>Description:</strong> {product.desc || 'No description available.'}</p>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
