import { useEffect } from "react";

const Home = () => {
    const checkLogin = async() => {
        let response = await("/api/auth/me")
        if(response.status_code!=200){
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