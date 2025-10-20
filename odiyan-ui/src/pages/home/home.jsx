import { useEffect, useState } from "react";

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
            Logged In User is {userDetails['username']}
        </div>
        </>
    )
}

export default Home;