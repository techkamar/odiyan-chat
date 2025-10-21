import './chatbody.css';
import ChatBodyLeftComponent from './chatleftcomp/chatleftcomponent';
import ChatBodyRightComponent from './chatrightcomp/chatrightcomponent';

const ChatBody = () => {
    return(
        <>
            <div className="chat-body-root-container">
                <ChatBodyLeftComponent/>
                <ChatBodyRightComponent/>
            </div>
        </>
    );
}
export default ChatBody;