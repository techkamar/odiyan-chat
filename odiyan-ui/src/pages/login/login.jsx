import { useState } from 'react';
import './login.css';

const Login = (props) => {
    return(
        <>
            <div className='login-root-container'>
                <div className='login-box-container'>
                    <div className='login-entry'>
                        <p style={{textAlign:'center', fontWeight:'bold', fontSize:'20px'}}> Login to your account</p>
                        <input type='text' placeholder='USERNAME'/>
                        <input type='password' placeholder='PASSWORD'/>
                        <button className='scale-btn'>LOGIN</button>
                    </div>
                    <div className='or-text-container'>---- OR ----</div>
                    <div className='login-entry'>
                        <button className='scale-btn' onClick={()=>(props.callback(false))}>REGISTER</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const Register = (props) => {
    return(
        <>
            <div className='login-root-container'>
                <div className='login-box-container'>
                    <div className='login-entry'>
                        <p style={{textAlign:'center', fontWeight:'bold', fontSize:'20px'}}> Create a new account </p>
                        <input type='text' placeholder='USERNAME'/>
                        <input type='password' placeholder='PASSWORD'/>
                        <input type='password' placeholder='CONFIRM PASSWORD'/>
                        <button className='scale-btn'>REGISTER</button>
                    </div>
                    <div className='or-text-container'>---- OR ----</div>
                    <div className='login-entry'>
                        <button className='scale-btn' onClick={()=>(props.callback(true))}>LOGIN</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const LoginRegisterMainComponent = () => {
    const [showLogin,setShowLogin] = useState(true);
    return (
        <>
        {
            showLogin?<Login callback={setShowLogin}/>:<Register callback={setShowLogin}/>
        }
        </>
    )
}

export default LoginRegisterMainComponent;