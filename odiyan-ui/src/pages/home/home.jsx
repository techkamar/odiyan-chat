import { useEffect, useState } from "react";
import HeaderBanner from "../header/header";
import ChatBody from "../chatbody/chatbody";
import {doSecureHTTPFetchGET} from "../../util.js";

const Home = () => {
    const [userDetails, setUserDetails] = useState({});
    const [chatHistory, setChatHistory] = useState({});

    const checkLogin = async() => {
        let response = await doSecureHTTPFetchGET("/api/auth/me");
        let tmpUserDetails = await response.json();
        setUserDetails(tmpUserDetails);
        
    }

    const appendChatHistory = async(data) => {
        const tmpChatHistory = structuredClone(chatHistory);
        if(data['recipient_user'] in tmpChatHistory == false){
            tmpChatHistory[data['recipient_user']] = []
        }

        tmpChatHistory[data['recipient_user']] = [...tmpChatHistory[data['recipient_user']], data['message_content_json']]
        setChatHistory(tmpChatHistory);
    }

    const loadMyMessages = async() => {
        let response = await doSecureHTTPFetchGET("/api/messages");
        let all_messages = await response.json();
        setChatHistory(all_messages);
    }

    useEffect(()=>{
        checkLogin();
        loadMyMessages();
        setInterval(loadMyMessages, 2000);
    },[]);
    
    return (
        <>
            <div>
                <HeaderBanner username={userDetails['username']} setChatHistory={appendChatHistory}/>
                <ChatBody chatHistory={chatHistory} setChatHistory={appendChatHistory}/>
            </div>
        </>
    )
}

export default Home;