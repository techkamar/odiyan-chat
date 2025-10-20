import { useEffect } from "react";

const Home = () => {
    const checkLogin = async() => {
        let response = await fetch("/api/auth/me");
        if(response.status!=200){
            window.location.href="/login";
        }
    }
    useEffect(()=>{
        checkLogin();
    },[]);
    
    return (
        <>This is Home Page</>
    )
}

export default Home;