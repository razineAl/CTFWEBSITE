import Navbar from '../components/Navbar';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';




function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [focused,setFocused] = useState(false);
    const [focus,setFocus] = useState(false);


    let navigate = useNavigate();

    const sendLogin = async ()=>{

        axios.post('http://localhost:3001/auth/login',{email:email,password:password},{withCredentials:true})
        .then((res)=>{
            navigate('/home');
        })
        
        
    }
    const handleFocus = ()=>{
        setFocus(true);

    }
    const handleFocused = ()=>{
        setFocused(true);

    }

    const handleBlur = ()=>{
        if (email==='') {
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
            axios.get('http://localhost:3001/logout',{withCredentials:true})
            .then((res)=>{
                
            })
        },[])
    return(
        <div id='login-page'>

            <Navbar></Navbar>
            <main id='login-page-main-content'>
                <div className='content'>
                    <h2>Elmore</h2>
                    <h2>Elmore</h2>
                </div>
                <div id='login-form-container'>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    if (email!=='' && password!=='') {
                        sendLogin();
                    }
                }}>

                    <div>
                        <label htmlFor='user' className={focus ? 'focused' : ''}>Email</label>
                        <input className={ focus ? 'focused' : ''} type='text' id='user' name='user' value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={(e)=>{setEmail(e.target.value)}}></input>
                    </div>
                    <div>
                        <label htmlFor='pwd' className={focused ? 'focused' : ''}>Password</label>
                        <input className={focused ? 'focused' : ''} type='password' id='pwd' name='pwd' value={password} onBlur={handleBlured} onFocus={handleFocused} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    </div>
                    <button type='submit' className='bg-blue'>Log in</button>
                </form>
                </div>
                
            </main>
            <Footer></Footer>
            
            
        </div>
        
    );
}

export default Login;
