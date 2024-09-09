import React from "react";
import "./Home.css";    
import {useTranslation} from "react-i18next";

import '../../components/auctionItems/AuctionItems';
import PaginationDemo from "../../components/auctionItems/AuctionItems";

const Home = () => {
    const {t} = useTranslation();
    
    return (
        <div className="fixed-width-container">
            <h1>{t('welcome')}</h1>
            <div>
                <PaginationDemo />
            </div>
        </div>
    );
}
export default Home;