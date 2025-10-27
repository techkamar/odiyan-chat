import { useState } from 'react';
import './chatrightcomponent.css';

const ChatBodyRightComponent = (props) => {
    const [messageToSend, setMessageToSend] = useState('');

    const getFormattedDateTime = (timestamp) => {
        const dateval = new Date(timestamp);
        return dateval.toLocaleDateString()+" "+dateval.toLocaleTimeString();
    }

    const sendMessage = async() => {
        const utcTimestamp = Date.now();

        const add_message_payload = {
            "recipient_user": props.recipientUser,
            "message_content_json": {
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
                'recipient_user':props.recipientUser,
                'message_content_json':{
                    "message": messageToSend,
                    "type": "sent",
                    "timestamp": utcTimestamp
                }
            })
            setMessageToSend('');
        }
    }

    const deleteIndividualConversation = async() => {
        const response = await fetch("/api/message/delete-conversation",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({'other_user':props.recipientUser})
        })

        props.setRecipientUser(null); // As conversation is deleted. We need to make sure no recipient is set to avoid crashes
    }

    const toShowContents = props.recipientUser!=null && props.recipientUser in props.chats;
    return(
        <div className="chat-body-right-container">
            {
                toShowContents?
                <div className='chat-history-top-bar'>
                    <span className='conversation-label'>Conversation with @{props.recipientUser}</span>
                    <button className='delete-conversation-button' onClick={()=>(deleteIndividualConversation())}> Delete This Conversation</button>
                </div>:
                <></>
            }
            
            <div className='chat-history-content-bar'>
                <div>
                    {
                        toShowContents ? props.chats[props.recipientUser].map((entry, index) => (
                            <div className={entry['type']}>
                                <span className='user_msg'>
                                    <div className='message-content'>{entry['message']}</div>
                                    <div>{getFormattedDateTime(entry['timestamp'])}</div>
                                </span>
                            </div>
                        )):<></>
                    }
                    {
                        toShowContents?
                            <div className='message-reply-box-parent-container'>
                            <div className='reply-label-container'> Reply to @{props.recipientUser}</div>
                            <div className='message-reply-box-container'>
                                <input type="text" value={messageToSend} placeholder='Enter your message' onChange={(e)=>(setMessageToSend(e.target.value))}/>
                                <button className='send-message-button' onClick={()=>(sendMessage())}>SEND</button>
                            </div>
                            </div>:
                            <></>
                    }
                    
                </div>
            </div>
        </div>
    );
}
export default ChatBodyRightComponent;