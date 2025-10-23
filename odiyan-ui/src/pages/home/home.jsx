import { useEffect, useState } from "react";
import HeaderBanner from "../header/header";
import ChatBody from "../chatbody/chatbody";


const Home = () => {
    const [userDetails, setUserDetails] = useState({});
    const [chatHistory, setChatHistory] = useState({});

    const checkLogin = async() => {
        let response = await fetch("/api/auth/me");
        if(response.status!=200){
            window.location.href="/login";
        }
        else{
            let tmpUserDetails = await response.json();
            setUserDetails(tmpUserDetails);
        }
    }

    const appendChatHistory = async(data) => {
        const tmpChatHistory = structuredClone(chatHistory);
        if(data['recipient_user'] in tmpChatHistory == false){
            tmpChatHistory[data['recipient_user']] = []
        }

        tmpChatHistory[data['recipient_user']] = [...tmpChatHistory[data['recipient_user']], data['message_content_json']]
        console.log("Chat History = ");
        console.log(tmpChatHistory);
        setChatHistory(tmpChatHistory);
    }

    const loadMyMessages = async() => {
        let response = await fetch("/api/messages");
        if(response.status==200){
            let all_messages = await response.json();
            
            let tmpChatHistory = structuredClone(chatHistory);
            console.log("cloned value = ")
            console.log(tmpChatHistory)

            for (const sender_user of Object.keys(all_messages)){

                if(sender_user in tmpChatHistory == false){
                        tmpChatHistory[sender_user] = []
                }
                console.log("History of Sender = ")
                console.log(tmpChatHistory[sender_user])

                //Problem is here
                tmpChatHistory[sender_user] = [...tmpChatHistory[sender_user], ...all_messages[sender_user]]
                
            }

            // Set back to State
            setChatHistory(tmpChatHistory);

            // Clear messages
            // let clear = await fetch("/api/messages/clear");
        }
    }

    useEffect(()=>{
        checkLogin();
        loadMyMessages();

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