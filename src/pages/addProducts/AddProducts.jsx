import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css';

const AddProducts = () => {
    const navigate = useNavigate();
    const [newCard, setNewCard] = useState({
        name: '',
        url: '',
        type: '',
        description: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedItems = JSON.parse(localStorage.getItem('myItems')) || [];


        const updatedItems = [...storedItems, newCard];


        localStorage.setItem('myItems', JSON.stringify(updatedItems));

        navigate('/my-items');
    };

    return (
        <div className="add-product-container">
            <h1>Adicionar Nova Carta para Leilão</h1>
            <div className="add-product-content">
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <label>
                        Nome da Carta:
                        <input
                            type="text"
                            name="name"
                            value={newCard.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        URL da Imagem:
                        <input
                            type="text"
                            name="url"
                            value={newCard.url}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Tipo de Carta:
                        <input
                            type="text"
                            name="type"
                            value={newCard.type}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            name="description"
                            value={newCard.description}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Preço:
                        <input
                            type="number"
                            name="price"
                            value={newCard.price}
                            onChange={handleChange}
                            required
                        />

                    </label>

                    <button type="submit" className="add-product-button">Adicionar Carta</button>
                </form>

                {}
                <div className="preview-card">
                    <h2>Prévia da Carta</h2>
                    <div className="preview-card-content">
                        <img
                            src={newCard.url || 'https://via.placeholder.com/150'}
                            alt={newCard.name || 'Prévia da Carta'}
                            className="preview-card-image"
                        />
                        <h3>{newCard.name || 'Nome da Carta'}</h3>
                        <p><strong>Tipo:</strong> {newCard.type || 'Tipo da Carta'}</p>
                        <p><strong>Descrição:</strong> {newCard.description || 'Descrição da Carta'}</p>
                        <p><strong>Preço:</strong> ${newCard.price || '0.00'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
