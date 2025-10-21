import { useState } from 'react';
import NewChatWindow from '../new_chat/new_chat';

import './header.css';

const HeaderBanner = (props) => {
    
    const [showAddNewMesasgeBox, setShowAddNewMesasgeBox] = useState(false);

    const logout = async() => {
        let response = await fetch("/api/auth/logout");
        window.location.href="/login";
    }


    return (
        <>
            <div className="header-banner-root-container">
                <div className="header-banner-left-container">Odiyan Chat v0.1 [{props.username}]</div>
                <div className="header-banner-right-container">
                    <button className='header-btn' onClick={()=>(setShowAddNewMesasgeBox(true))}>[+] New Message</button>
                    <button className='header-btn'>Self Destruct Me!</button>
                    <button className='header-btn' onClick={()=>(logout())}>Logout</button>
                </div>
            </div>
            {
                showAddNewMesasgeBox? <NewChatWindow show={setShowAddNewMesasgeBox}/>:<></>
            }
            
        </>
    )
}
export default HeaderBanner