import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefaultNotification.css';
import './MyItems.css'; 
import { Card } from 'primereact/card';
import { useTranslation } from "react-i18next";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import CategoryService from "../../services/CategoryService"; 

import dashboardImage from '../../components/assets/images/dashboard.png';

const MyItems = () => {
    const [myItems, setMyItems] = useState([]);
    const [statistics, setStatistics] = useState({
        totalItems: 0,
        totalSold: 0,
        totalRevenue: 0 
    });

    const [showCreateCategoryDialog, setShowCreateCategoryDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const categoryService = new CategoryService(); 

    const { t } = useTranslation();
    const msgs = useRef(null); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await categoryService.listMyCategories();
                setMyItems(categories);
            } catch (error) {
                msgs.current.show({
                    severity: 'error',
                    summary: t('my-items.error'),
                    detail: t('my-items.error-fetching-categories'),
                });
            }
        };
    
        fetchCategories();
    }, []);
    const handleAddNewItem = (newItem) => {
        const updatedItems = [...myItems, newItem];
        setMyItems(updatedItems);
        localStorage.setItem('myItems', JSON.stringify(updatedItems));
    };

    const handleCreateCategory = async () => {

        if (!categoryName.trim() || !categoryDescription.trim()) {
            msgs.current.show({
                severity: 'error',
                summary: t('my-items.error'),
                detail: t('my-items.empty-fields'),
                sticky: true 
            });
            return;
        }

        try {
            const newCategory = {
                name: categoryName,
                description: categoryDescription,
            };


            await categoryService.create(newCategory);


            const updatedCategories = await categoryService.listAll(); // ou listMyCategories()
            setMyItems(updatedCategories);


            setShowCreateCategoryDialog(false);
            setCategoryName("");
            setCategoryDescription("");

            msgs.current.show({
                severity: 'success',
                summary: t('my-items.success'),
                detail: t('my-items.category-created'),
                sticky: true
            });
        } catch (error) {

            msgs.current.show({
                severity: 'error',
                summary: t('my-items.error'),
                detail: t('my-items.error-creating-category'),
                sticky: true
            });
        }
    };

    return (
        <div className=''>
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
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
                        <p>{t('my-items.no-items')}</p>
                    )}

                    </div>

                    <div className="add-item">
                        <Link to="./add-products" className="add-item-button">{t('my-items.add-items')}</Link>
                        <Button
                            label={t('my-items.create-category')}
                            className="create-category-button"
                            onClick={() => setShowCreateCategoryDialog(true)}
                        />
                    </div>

                    <Dialog
                        visible={showCreateCategoryDialog}
                        style={{ width: '400px' }}
                        header={t('my-items.create-category')}
                        modal
                        onHide={() => setShowCreateCategoryDialog(false)}
                    >
                        <div className="p-field">
                            <label htmlFor="categoryName">{t('my-items.category-name')}</label>
                            <InputText
                                id="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="categoryDescription">{t('my-items.category-description')}</label>
                            <InputText
                                id="categoryDescription"
                                value={categoryDescription}
                                onChange={(e) => setCategoryDescription(e.target.value)}
                            />
                        </div>
                        <div className="dialog-buttons">
                            <Button
                                label={t('my-items.save')}
                                onClick={handleCreateCategory}
                                className="p-button-success"
                            />
                            <Button
                                label={t('my-items.back')}
                                onClick={() => setShowCreateCategoryDialog(false)}
                                className="p-button-secondary"
                            />
                        </div>
                    </Dialog>
                </div>
            </Card>
        </div>
    );
};

export default MyItems;
