import image from '../ElmoreCTF.png';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';




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
    // const navigation = (url)=>{
    //     window.location.href = url;
    // }
    // const auth = async ()=>{
    //     const response = await fetch('http://localhost:3001/oauth',{method:'POST'});
    //     const data = await response.json();
    //     navigation(data.url);
    // }
    return(
        <div id='login-page'>

            <nav id="main-navbar">
                <div><img src={image} alt=""></img></div>
                <div><p>you haven't already created an account ?</p><Link className='btn' to='/registration'>Sign up</Link></div>
            </nav>
            <main id='login-page-main-content'>
                <div className='content'>
                    <h2>Elmore CTF</h2>
                    <h2>Elmore CTF</h2>
                    
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
            
            
        </div>
        
    );
}

export default Login;
