import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css';
import AuctionService from '../../services/AuctionService';
import CategoryService from '../../services/CategoryService';

const auctionService = new AuctionService();
const categoryService = new CategoryService();

const AddProducts = () => {
    const navigate = useNavigate();
    const [newCard, setNewCard] = useState({
        name: '',
        url: '',
        type: '',
        description: '',
        price: '',
        startDateTime: '',
        endDateTime: '',
        categoryId: '' // Adicionado campo para categoria
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.listAll();
                console.log('Categorias retornadas:', response);
                setCategories(Array.isArray(response) ? response : []);
            } catch (err) {
                console.error('Erro ao carregar categorias:', err);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const auctionData = {
            title: newCard.name,
            description: newCard.description,
            startDateTime: newCard.startDateTime,
            endDateTime: newCard.endDateTime,
            status: 'OPEN',
            incrementValue: parseFloat(newCard.price),
            imageUrl: newCard.url,
            cardType: newCard.type,
            categoryId: newCard.categoryId
        };

        console.log('Dados enviados:', auctionData);

        try {
            await auctionService.createAuction(auctionData);
            navigate('/my-items');
        } catch (err) {
            setError('Erro ao adicionar a carta. Tente novamente mais tarde.');
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                        Categoria:
                        <select
                            name="categoryId"
                            value={newCard.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {Array.isArray(categories) && categories.map(category => (
    <option key={category.id} value={category.id}>
        {category.name}
    </option>
))}
                        </select>
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

                    <label>
                        Data e Hora de Início:
                        <input
                            type="datetime-local"
                            name="startDateTime"
                            value={newCard.startDateTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Data e Hora de Término:
                        <input
                            type="datetime-local"
                            name="endDateTime"
                            value={newCard.endDateTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="add-product-button"
                        disabled={loading}
                    >
                        {loading ? 'Adicionando...' : 'Adicionar Carta'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>

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
                        <p><strong>Categoria:</strong> {
    categories.find(cat => String(cat.id) === String(newCard.categoryId))?.name || 'Não definida'
}</p>
                        <p><strong>Descrição:</strong> {newCard.description || 'Descrição da Carta'}</p>
                        <p><strong>Preço:</strong> ${newCard.price || '0.00'}</p>
                        <p><strong>Início:</strong> {newCard.startDateTime || 'Não definido'}</p>
                        <p><strong>Término:</strong> {newCard.endDateTime || 'Não definido'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
