import { useEffect } from 'react';
import './chatleftcomponent.css';

const ChatBodyLeftComponent = (props) => {
    return(
        <>
            <div class="chat-body-left-container">
                {
                    props.contacts.map((item, index) => (
                        <div>{item}</div>
                    ))
                }
            </div>    
        </>
    );
}
export default ChatBodyLeftComponent;