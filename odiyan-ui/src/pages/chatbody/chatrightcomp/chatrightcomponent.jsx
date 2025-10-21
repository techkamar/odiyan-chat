import './chatrightcomponent.css';

const ChatBodyRightComponent = (props) => {
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
                            </div>
                        </div>
                    </>:<></>
                }
            </div>    
        </>
    );
}
export default ChatBodyRightComponent;