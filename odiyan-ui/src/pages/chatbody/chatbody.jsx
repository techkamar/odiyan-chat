import { useEffect } from 'react';
import './chatbody.css';
import ChatBodyLeftComponent from './chatleftcomp/chatleftcomponent';
import ChatBodyRightComponent from './chatrightcomp/chatrightcomponent';

const ChatBody = (props) => {
    return(
        <>
            <div className="chat-body-root-container">
                <ChatBodyLeftComponent contacts={Object.keys(props.chatHistory)}/>
                <ChatBodyRightComponent/>
            </div>
        </>
    );
}
export default ChatBody;