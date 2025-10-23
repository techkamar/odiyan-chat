import { useEffect } from 'react';
import './chatleftcomponent.css';

const ChatBodyLeftComponent = (props) => {
    return(
        <>
            <div className="chat-body-left-container">
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