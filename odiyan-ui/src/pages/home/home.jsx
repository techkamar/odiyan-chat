import { useEffect, useState } from "react";
import HeaderBanner from "../header/header";
import ChatBody from "../chatbody/chatbody";


const Home = () => {
    const [userDetails, setUserDetails] = useState({"":[]});
    const [chattingWith,setChattingWith] = useState("");
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
        if(data['username'] in tmpChatHistory == false){
            tmpChatHistory[data['username']] = []
        }

        tmpChatHistory[data['username']] = [...tmpChatHistory[data['username']], data['msg_entry']]
        console.log("Chat History = ");
        console.log(tmpChatHistory);
        setChatHistory(tmpChatHistory);
    }
    useEffect(()=>{
        checkLogin();
    },[]);
    
    return (
        <>
            <div>
                <HeaderBanner username={userDetails['username']} setChatHistory={appendChatHistory}/>
                <ChatBody chatHistory={chatHistory} chattingWith={chattingWith} setChattingWith={setChattingWith}/>
            </div>
        </>
    )
}

export default Home;