import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import Modal from 'react-modal';
import '../../pages/home/Home.css';
import AuctionService from '../../services/AuctionService';
import CategoryService from '../../services/CategoryService';


Modal.setAppElement('#root');

export default function PaginationDemo() {
    const [auctions, setAuctions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const auctionService = new AuctionService();
    const categoryService = new CategoryService();

    useEffect(() => {
        const fetchAuctionsWithCategories = async () => {
            try {
                const [auctionData, categoryData] = await Promise.all([
                    auctionService.getPublicAuctions(),
                    categoryService.listAll()
                ]);
    
                console.log('Leilões:', auctionData);
                console.log('Categorias:', categoryData);
    
                const enrichedAuctions = auctionData.map(auction => ({
                    ...auction,
                    category: categoryData.find(cat => cat.id === auction.categoryId) || null
                }));
    
                console.log('Leilões com categorias:', enrichedAuctions);
    
                setAuctions(enrichedAuctions);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
    
        fetchAuctionsWithCategories();
    }, []);
    
    

    const openModal = (image) => {
        setModalImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const itemTemplate = (auction, index) => {
        return (
            <div className="col-12" key={auction.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round cursor-pointer"
                        src={auction.imageUrl} 
                        alt={auction.title}  
                        onClick={() => openModal(auction.imageUrl)}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <a href={`/card-details/${auction.id}`} className="text-2xl font-bold text-900 no-underline hover-blue cursor-pointer">
    {auction.title}
</a>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">Descrição: {auction.description || 'Sem descrição'}</span>

                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${auction.incrementValue}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={auctions} itemTemplate={itemTemplate} paginator rows={5} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="Modal"
                overlayClassName="Overlay"
                onClick={closeModal}
            >
                <img src={modalImage} alt="Expanded view" className="expanded-image" />
            </Modal>
        </div>
    );
}
