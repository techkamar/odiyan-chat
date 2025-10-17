import './login.css';

const Login = () => {
    return(
        <>
            <div className='login-root-container'>
                <div className='login-box-container'>
                    <div className='login-entry'>
                        <input type='text' placeholder='USERNAME'/>
                        <input type='password' placeholder='PASSWORD'/>
                        <button className='scale-btn crimson'>LOGIN</button>
                    </div>
                    <div className='or-text-container'>---- OR ----</div>
                    <div className='login-entry'>
                        <button className='scale-btn green'>REGISTER</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;