import { useState } from 'react';
import './chatrightcomponent.css';

const ChatBodyRightComponent = (props) => {
    const [messageToSend, setMessageToSend] = useState('');

    return(
        <>
            <div class="chat-body-right-container">
                {
                    props.chatUsername!=""?
                    <>
                        <div className='chat-history-top-bar'> Now Chatting with @{props.chatUsername}</div>
                        <div className='chat-history-content-bar'>
                            <div>
                                {
                                    props.chats[props.chatUsername].map((entry, index) => (
                                        <div className={entry['type']}><span className='user_msg'>{entry['message']}</span></div>
                                    ))
                                }
                                <div className='message-reply-box-parent-container'>
                                    <div className='reply-label-container'> Reply to User</div>
                                    <div className='message-reply-box-container'>
                                        <input type="text" placeholder='Enter your message' onChange={(e)=>(setMessageToSend(e.target.value))}/>
                                        <button onClick={()=>(sendMessage())}>SEND</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>:<></>
                }
            </div>    
        </>
    );
}
export default ChatBodyRightComponent;