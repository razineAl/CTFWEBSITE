
import Navbar from '../components/Navbar';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';
import Cookies from 'universal-cookie';



function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [focused,setFocused] = useState(false);
    const [focus,setFocus] = useState(false);
    const {authState,setAuthState} = useContext(AuthContext);

    let navigate = useNavigate();
    const cookies = new Cookies();
    const sendLogin = ()=>{
        axios.post('http://localhost:3001/auth/login',{username:username,password:password})
        .then((res)=>{
            if(!res.error){
                cookies.set('refreshToken',res.data.refreshToken);
                setAuthState({username:res.data.username,status:true,id:res.data.id,accessToken:res.data.accessToken});
                navigate('/home');

            }
        })
    }
    const handleFocus = ()=>{
        setFocus(true);

    }
    const handleFocused = ()=>{
        setFocused(true);

    }

    const handleBlur = ()=>{
        if (username==='') {
            setFocus(false);
        }

    }
    const handleBlured = ()=>{
        if (password==='') {
            setFocused(false);
        }        
    }
    useEffect(
        ()=>{
            const refreshToken = cookies.get('refreshToken');
            if (refreshToken) {
                cookies.remove('refreshToken');
            }
        },[])
    return(
        <div id='login-page'>

        
            <Navbar></Navbar>
            <div id='title'>
                <span style={{animationDelay:0.1+'s'}}>E</span>
                <span style={{animationDelay:0.2+'s'}}>L</span>
                <span style={{animationDelay:0.3+'s'}}>M</span>
                <span style={{animationDelay:0.4+'s'}}>O</span>
                <span style={{animationDelay:0.5+'s'}}>R</span>
                <span style={{animationDelay:0.6+'s'}}>E</span>
                <br></br>
                <span style={{animationDelay:0.7+'s'}}>C</span>
                <span style={{animationDelay:0.8+'s'}}>T</span>
                <span style={{animationDelay:0.9+'s'}}>F</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if (username!=='' && password!=='') {
                    sendLogin();
                }
                }}>

                <div>
                    <label htmlFor='user' className={focus ? 'focused' : ''}>Username</label>
                    <input className={ focus ? 'focused' : ''} type='text' id='user' name='user' value={username} onBlur={handleBlur} onFocus={handleFocus} onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='pwd' className={focused ? 'focused' : ''}>Password</label>
                    <input className={focused ? 'focused' : ''} type='password' id='pwd' name='pwd' value={password} onBlur={handleBlured} onFocus={handleFocused} onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <button type='submit' className='bg-blue'>Log in</button>
            </form>
            
        </div>
        
    );
}

export default Login;
