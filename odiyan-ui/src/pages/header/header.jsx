import './header.css';
const HeaderBanner = (props) => {
    
    const logout = async() => {
        let response = await fetch("/api/auth/logout");
        window.location.href="/login";
    }

    return (
        <>
            <div className="header-banner-root-container">
                <div className="header-banner-left-container">Odiyan Chat v0.1 [{props.username}]</div>
                <div className="header-banner-right-container">
                    <button className='header-btn'>Self Destruct Me!</button>
                    <button className='header-btn' onClick={()=>(logout())}>Logout</button>
                </div>
            </div>
        </>
    )
}
export default HeaderBanner