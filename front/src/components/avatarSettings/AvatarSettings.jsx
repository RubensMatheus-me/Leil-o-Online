import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './AvatarSettings.css';

import '../logout/Logout';
import Logout from '../logout/Logout';

const AvatarSettings = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleProfie = () => {
        
        navigate("/user/profile");
    }

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: null,
            icon: <Avatar image="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png" shape="circle" />,
            items: [
                {
                    label: t('header.profile'),
                    icon: 'pi pi-user',
                    command: handleProfie,
                    template: itemRenderer
                },  
                {
                    label: t('header.logout'),
                    command: handleLogout,
                    icon: 'pi pi-sign-in ',
                    template: itemRenderer
                }
            ]
        },
    ];
    return (
        <div className='card'>
            <Menubar model={items}/>
        </div>
    )

}
export default AvatarSettings;