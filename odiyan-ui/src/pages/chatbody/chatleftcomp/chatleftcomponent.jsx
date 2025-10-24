import { useEffect } from 'react';
import './chatleftcomponent.css';

const ChatBodyLeftComponent = (props) => {
    return(
        <>
            <div className="chat-body-left-container">
                <div className='contact-label'>Contacts</div>
                {
                    props.contacts.map((username, index) => (
                        <div className='chat-contact' onClick={()=>(props.setRecipientUser(username))}>@{username}</div>
                    ))
                }
            </div>    
        </>
    );
}
export default ChatBodyLeftComponent;