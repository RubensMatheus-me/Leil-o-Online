import React from "react";
import "./Home.css";
import { useTranslation } from "react-i18next";
import PaginationDemo from "../../components/auctionItems/AuctionItems";

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="fixed-width-container text-align center">
            <h1>{t('home.welcome')}</h1>
            <p>{t('home.offers')}!</p>
            <div>
                <PaginationDemo />
            </div>
        </div>
    );
}

export default Home;
