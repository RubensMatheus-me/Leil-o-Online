import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import ProductService from '../../service/ProductService';
import Modal from 'react-modal';
import '../../pages/home/Home.css';

Modal.setAppElement('#root');

export default function PaginationDemo() {
    const [products, setProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        const fetchProductTypes = async () => {
            const productList = ProductService();

            const updatedProducts = await Promise.all(
                productList.map(async (product) => {
                    try {
                        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(product.name)}`);
                        const data = await response.json();

                        if (data.data && data.data.length > 0) {
                            return {
                                ...product,
                                category: data.data[0].type,
                            };
                        } else {
                            return { ...product, category: 'Unknown' };
                        }
                    } catch (error) {
                        console.error('Erro ao buscar tipo de carta:', error);
                        return { ...product, category: 'Error' };
                    }
                })
            );

            setProducts(updatedProducts);
        };

        fetchProductTypes();
    }, []);

    const openModal = (image) => {
        setModalImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round cursor-pointer"
                        src={product.image}
                        alt={product.name}
                        onClick={() => openModal(product.image)}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <a href={`/card-details/${product.id}`} className="text-2xl font-bold text-900 no-underline hover-blue cursor-pointer">
                                {product.name}
                            </a>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span> {}
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
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
