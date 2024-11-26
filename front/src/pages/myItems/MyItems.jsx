import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyItems.css'; 
import { Card } from 'primereact/card';
import { useTranslation } from "react-i18next";

import dashboardImage from '../../components/assets/images/dashboard.png';

const MyItems = () => {
    const [myItems, setMyItems] = useState([]);
    const [statistics, setStatistics] = useState({
        totalItems: 0,
        totalSold: 0,
        totalRevenue: 0 
    });

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('myItems')) || [];
        setMyItems(storedItems);

        const totalItems = storedItems.length;
        const totalSold = storedItems.filter(p => p.inventoryStatus !== 'INSTOCK').length;

        const totalRevenue = storedItems
            .filter(p => p.inventoryStatus !== 'INSTOCK')
            .reduce((acc, p) => acc + (parseFloat(p.price) || 0), 0);

        setStatistics({
            totalItems,
            totalSold,
            totalRevenue 
        });
    }, []);

    const handleAddNewItem = (newItem) => {
        const updatedItems = [...myItems, newItem];
        setMyItems(updatedItems);
        localStorage.setItem('myItems', JSON.stringify(updatedItems));
    };

    const { t } = useTranslation();
    return (
        <Card>
            <div className="my-items-container">
                <h1>{t('my-items.title')}</h1>
                
                <img src={dashboardImage} alt="Dashboard Representation" className="dashboard-image" />

                <div className="dashboard">
                    <h2>{t('my-items.dashboard')}</h2>
                    <div className="statistic-item">
                        <span>{t('my-items.total-items')}</span>
                        <span>{statistics.totalItems}</span>
                    </div>
                    <div className="statistic-item">
                        <span>{t('my-items.total-sold')}</span>
                        <span>{statistics.totalSold}</span>
                    </div>
                    <div className="statistic-item">
                        <span>{t('my-items.total-money')} ${Number(statistics.totalRevenue).toFixed(2)}</span>
                    </div>
                </div>

                <div className="items-list">
                    <h2>{t('my-items.auction-items')}</h2>
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
                    <Link to="./add-products" className="add-item-button">{t('my-items.add-items')}</Link>
                </div>
            </div>
        </Card>
    );
};

export default MyItems;
