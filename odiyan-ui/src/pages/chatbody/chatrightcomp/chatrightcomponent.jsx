import { useState } from 'react';
import './chatrightcomponent.css';

const ChatBodyRightComponent = (props) => {
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = async() => {
        const utcTimestamp = Date.now();

        const add_message_payload = {
            "recipient_user": props.chatUsername,
            "message_content_json": {
                "type": "recieved", // to make sure that alignment is linked with CSS class
                "message": messageToSend,
                "timestamp": utcTimestamp
            }
        }

        let response = await fetch("/api/message",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(add_message_payload)
        })

        if (response.status==200){
            props.setChatHistory({
                'recipient_user':props.chatUsername,
                'message_content_json':{
                    "type": "sent",
                    "message": messageToSend,
                    "timestamp": utcTimestamp
                }
            })
            setMessageToSend('');// Clear Text box
        }
    }

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
                                    <div className='reply-label-container'> Reply to @{props.chatUsername}</div>
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