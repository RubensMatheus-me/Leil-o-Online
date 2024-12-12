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
import AuctionService from "../../services/AuctionService"; 

import dashboardImage from '../../components/assets/images/dashboard.png';

const MyItems = () => {
    const [showCreateCategoryDialog, setShowCreateCategoryDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [auctions, setAuctions] = useState([]);
    const categoryService = new CategoryService(); 
    const auctionService = new AuctionService(); 

    const { t } = useTranslation();
    const msgs = useRef(null); 

    useEffect(() => {
        const fetchUserAuctions = async () => {
            try {
                const userAuctions = await auctionService.getUserAuctions();
                setAuctions(userAuctions);
            } catch (error) {
                console.error('Erro ao carregar leilões do usuário:', error);
                msgs.current.show({
                    severity: 'error',
                    summary: t('my-items.error'),
                    detail: t('my-items.error-loading-auctions'),
                    sticky: true 
                });
            }
        };
        fetchUserAuctions();
    }, []);

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
    
            setCategoryName("");
            setCategoryDescription("");
            setShowCreateCategoryDialog(false);
    
            msgs.current.show({
                severity: 'success',
                summary: t('my-items.success'),
                detail: t('my-items.category-created'),
                sticky: true
            });
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            msgs.current.show({
                severity: 'error',
                summary: t('my-items.error'),
                detail: t('my-items.error-creating-category'),
                sticky: true
            });
        }
    };

    const handleDeleteAuction = async (id) => {
        try {
            await auctionService.deleteAuction(id);
            setAuctions(auctions.filter((auction) => auction.id !== id));
            msgs.current.show({
                severity: 'success',
                summary: t('my-items.success'),
                detail: t('my-items.auction-deleted'),
                sticky: true
            });
        } catch (error) {
            msgs.current.show({
                severity: 'error',
                summary: t('my-items.error'),
                detail: t('my-items.error-deleting-auction'),
                sticky: true
            });
        }
    };

    const handleEditAuction = (auctionId) => {
        console.log("Editar leilão com ID:", auctionId);
    };

    return (
        <div>
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
                            <span>{auctions.length}</span>
                        </div>
                        <div className="statistic-item">
                            <span>{t('my-items.total-sold')}</span>
                            <span>0</span>
                        </div>
                        <div className="statistic-item">
                            <span>{t('my-items.total-money')} $0.00</span>
                        </div>
                    </div>

                    <div className="add-item">
                        <Link to="./add-products" className="add-item-button">{t('my-items.add-items')}</Link>
                        <Button
                            label={t('my-items.create-category')}
                            className="create-category-button"
                            onClick={() => setShowCreateCategoryDialog(true)}
                        />
                    </div>

                    <div className="auction-list">
                        <h3>{t('my-items.my-auctions')}</h3>
                        {auctions.length > 0 ? (
                            auctions.map((auction) => (
                                <div key={auction.id} className="auction-item">
                                    {auction.imageUrl && <img src={auction.imageUrl} alt={auction.title} className="auction-image" />}
                                    <h4>{auction.title}</h4>
                                    <p>{auction.description}</p>
                                    <div className="auction-actions">
                                        <Button
                                            label={t('my-items.edit')}
                                            onClick={() => handleEditAuction(auction.id)}
                                            className="p-button-warning"
                                        />
                                        <Button
                                            label={t('my-items.delete')}
                                            onClick={() => handleDeleteAuction(auction.id)}
                                            className="p-button-danger"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>{t('my-items.no-auctions')}</p>
                        )}
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
