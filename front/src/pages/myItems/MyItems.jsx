import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyItems.css'; 

const MyItems = () => {
    const [myItems, setMyItems] = useState([]);
    const [statistics, setStatistics] = useState({
        totalItems: 0,
        totalSold: 0,
        totalRevenue: 0 
    });
    

    useEffect(() => {
        // Carregar itens salvos no localStorage
        const storedItems = JSON.parse(localStorage.getItem('myItems')) || [];
        setMyItems(storedItems);
        
        // Atualizar estatísticas
        const totalItems = storedItems.length;
        const totalSold = storedItems.filter(p => p.inventoryStatus !== 'INSTOCK').length;
    
        // Garante que o preço seja tratado corretamente
        const totalRevenue = storedItems
            .filter(p => p.inventoryStatus !== 'INSTOCK')
            .reduce((acc, p) => acc + (parseFloat(p.price) || 0), 0);
    
        setStatistics({
            totalItems,
            totalSold,
            totalRevenue // Aqui, o totalRevenue já está garantido ser numérico
        });
    }, []);

    const handleAddNewItem = (newItem) => {
        const updatedItems = [...myItems, newItem];
        setMyItems(updatedItems);
        localStorage.setItem('myItems', JSON.stringify(updatedItems));
    };

    return (
        <div className="my-items-container">
            <h1>Meus Itens</h1>

            <div className="dashboard">
                <h2>Dashboard</h2>
                <div className="statistic-item">
                    <span>Total de Itens:</span>
                    <span>{statistics.totalItems}</span>
                </div>
                <div className="statistic-item">
                    <span>Total Vendido:</span>
                    <span>{statistics.totalSold}</span>
                </div>
                <div className="statistic-item">
                    <span>Receita Total: ${Number(statistics.totalRevenue).toFixed(2)}</span>
                </div>
            </div>

            <div className="items-list">
                <h2>Itens Leiloados</h2>
                {myItems.length > 0 ? (
                <ul>
                    {myItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.url} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p><strong>Preço:</strong> ${item.price}</p>
                                <p><strong>Categoria:</strong> {item.type}</p>
                                <p><strong>Status:</strong> {item.inventoryStatus}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Você ainda não adicionou itens para leiloar.</p>
            )}

            </div>

            <div className="add-item">
                <Link to="./add-products" className="add-item-button">Adicionar Novo Item</Link>
            </div>
        </div>
    );
};

export default MyItems;
