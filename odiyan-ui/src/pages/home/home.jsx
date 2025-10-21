import { useEffect, useState } from "react";
import HeaderBanner from "../header/header";


const Home = () => {
    const [userDetails, setUserDetails] = useState({});
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
    useEffect(()=>{
        checkLogin();
    },[]);
    
    return (
        <>
            <div>
                <HeaderBanner username={userDetails['username']}/>
                
            </div>
        </>
    )
}

export default Home;