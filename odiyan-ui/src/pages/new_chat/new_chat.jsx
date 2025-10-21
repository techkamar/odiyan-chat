import './new_chat.css';

const NewChatWindow = (props) => {
    return(
        <dialog className='chat-dialog' open>
            <div className="new-chat-window-root-container">
                <div className="new-chat-window-inner-container">
                    <div className="new-chat-user-search-box">
                        <input type="text" placeholder="Enter username"/>
                        <button>Search</button>
                    </div>
                    <div className="new-chat-user-result-box">
                    </div>
                    <div className="new-chat-window-footer-box">
                        <button className='chat-dialog-close-btn' onClick={()=>(props.show(false))}>Close</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
export default NewChatWindow;