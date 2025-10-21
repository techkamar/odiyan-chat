import { useState } from 'react';
import './new_chat.css';

const NewChatWindow = (props) => {
    const [searchUsername, setSearchUsername] = useState('');
    const [userFound, setUserFound] = useState(false);

    const findUser = async() => {
        let response = await fetch("/api/user/search",{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify({'username':searchUsername})

        })
        
        let response_json = await response.json();

        if(response.status!=200){
            alert(response_json['message']);
        }
        else if(response_json['user_exists']){
            setUserFound(true);
        }
        else{
            setUserFound(false);
            alert("User : "+searchUsername+" not found");
        }
    }
    return(
        <dialog className='chat-dialog' open>
            <div className="new-chat-window-root-container">
                <div className="new-chat-window-inner-container">
                    <div className="new-chat-user-search-box">
                        <input type="text" placeholder="Enter username" onChange={(e)=>{setUserFound(false);setSearchUsername(e.target.value)}}/>
                        <button onClick={()=>(findUser())}>Search</button>
                    </div>
                    <div className="new-chat-user-result-box">
                        {
                            userFound?<button className='chat-dialog-say-hi-btn'>Say Hi to {searchUsername}</button>:<></>
                        }
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