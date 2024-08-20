
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import "./Sidebar.css";

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Sidebar className="sidebar"  visible={visible} onHide={() => setVisible(false)}>
                <h2>Sidebar</h2>
                
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
    )
}
