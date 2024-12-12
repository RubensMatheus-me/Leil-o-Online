import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuctionService from '../../services/AuctionService';
import './CardDetails.css';

const CardDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auctionService = new AuctionService();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const auctionData = await auctionService.getAuctionById(id);
                setProduct(auctionData);
                const userData = await auctionService.getAuthenticatedUser();
                setUser(userData);
    
            } catch (err) {
                setError('Error fetching auction or user details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDetails();
    }, [id]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Auction not found</div>;
    }

    return (
        <div className="card-details-container">
            <h1>{product.title}</h1>
<div className="card-details-content">
    <img
        src={product.imageUrl || '/default-image.jpg'}
        alt={product.title}
        className="card-image"
    />
    <div className="card-info">
        <p><strong>Price:</strong> ${product.price || 'N/A'}</p>
        <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
        <p><strong>Category:</strong> {product.category || 'N/A'}</p>
    </div>
            </div>

            {user && (
                <div className="user-info">
                    <h2>Seller Information</h2>
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default CardDetails;
