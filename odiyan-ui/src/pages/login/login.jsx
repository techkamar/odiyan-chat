import { useState } from 'react';
import './login.css';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async() => {
        let response = await fetch("/api/auth/login",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'username': username,
                    'password': password,
                }
            )
        });

        if (response.status==200)
        {
            window.location.href = "/"; // Redirect to homepage
        }
        else
        {
            let error_message = await response.json();
            alert(error_message['message']);
        }
    }
    return(
        <>
            <div className='login-root-container'>
                <div className='login-box-container'>
                    <div className='login-entry'>
                        <p style={{textAlign:'center', fontWeight:'bold', fontSize:'20px'}}> Login to your account</p>
                        <input type='text' placeholder='USERNAME' onChange={(e)=>(setUsername(e.target.value))}/>
                        <input type='password' placeholder='PASSWORD'onChange={(e)=>(setPassword(e.target.value))}/>
                        <button className='scale-btn'onClick={()=>(doLogin())}>LOGIN</button>
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const doRegister = async() => {
        let response = await fetch("/api/user",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'username': username,
                    'password': password,
                    'confirm_password': confirmPassword
                }
            )
        });

        if (response.status==201)
        {
            // Show Login Page
            props.callback(true);
        }
        else
        {
            let error_message = await response.json();
            alert(error_message['message']);
        }
    }
    return(
        <>
            <div className='login-root-container'>
                <div className='login-box-container'>
                    <div className='login-entry'>
                        <p style={{textAlign:'center', fontWeight:'bold', fontSize:'20px'}}> Create a new account </p>
                        <input type='text' placeholder='USERNAME'onChange={(e)=>(setUsername(e.target.value))}/>
                        <input type='password' placeholder='PASSWORD' onChange={(e)=>(setPassword(e.target.value))}/>
                        <input type='password' placeholder='CONFIRM PASSWORD'onChange={(e)=>(setConfirmPassword(e.target.value))}/>
                        <button className='scale-btn' onClick={()=>(doRegister())}>REGISTER</button>
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