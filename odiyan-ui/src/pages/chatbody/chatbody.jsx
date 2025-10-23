import { useEffect } from 'react';
import './chatbody.css';
import ChatBodyLeftComponent from './chatleftcomp/chatleftcomponent';
import ChatBodyRightComponent from './chatrightcomp/chatrightcomponent';

const ChatBody = (props) => {
    return(
        <>
            <div className="chat-body-root-container">
                <ChatBodyLeftComponent contacts={Object.keys(props.chatHistory)} setChattingWith={props.setChattingWith}/>
                <ChatBodyRightComponent chatUsername={props.chattingWith} chats={props.chatHistory} setChatHistory={props.setChatHistory}/>
            </div>
        </>
    );
}
export default ChatBody;