import { useEffect, useState } from 'react';
import './chatbody.css';
import ChatBodyLeftComponent from './chatleftcomp/chatleftcomponent';
import ChatBodyRightComponent from './chatrightcomp/chatrightcomponent';

const ChatBody = (props) => {
    const [recipientUser, setRecipientUser] = useState(null);

    return(
        <>
            <div className="chat-body-root-container">
                <ChatBodyLeftComponent contacts={Object.keys(props.chatHistory)} setRecipientUser={setRecipientUser}/>
                <ChatBodyRightComponent recipientUser={recipientUser} chats={props.chatHistory} setChatHistory={props.setChatHistory} setRecipientUser={setRecipientUser}/>
            </div>
        </>
    );
}
export default ChatBody;