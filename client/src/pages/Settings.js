import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Settings() {
    const {authState,setAuthState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [navOptions,setNavOptions] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [oldPass,setOldPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [account,setAccount] = useState('');
    const optionsRef = useRef(null);

    let navigate = useNavigate();





    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});  
            setUsername(res.data.username);
            setLoading(false);  
        })
        
    },[])
    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    const {id} = useParams();


    

    const changeUsername = ()=>{
        axios.put(`http://localhost:3001/users/update/username/${id}`,{username:username},{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
        .then((res)=>{
            navigate(0);
        })
    }   
    const changePassword = ()=>{
        axios.put(`http://localhost:3001/users/update/password/${id}`,{currentPassword:oldPass,newPassword:password,passwordConfirmation:newPass},{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
        .then((res)=>{
            navigate(0);
        })
    }   
    const deleteAccount = ()=>{
        axios.put(`http://localhost:3001/users/account/delete/${id}`,{account:account},{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
        .then((res)=>{
            navigate('/');
        })
    }   
  return (
    <div id='settings-page'>

        {
            loading ? (
                <BarLoader
                    color="#000046"
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) :
            (
            <>
            <Navbar></Navbar>
            <main id='settings-main-page'>
                <div>
                    <h2>Change Username</h2>
                    <label>New Username</label>
                    <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                    <div>
                        <button type='button' onClick={changeUsername}>Change Username</button>
                    </div>
                    
                </div>
                <div>
                    <h2>Change Password</h2>
                    <label>Current Password</label>
                    <input type='password' value={oldPass} onChange={(e)=>{setOldPass(e.target.value)}}></input>
                    <label>New Password</label>
                    <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <label>Confirm New Password</label>
                    <input type='text' value={newPass} onChange={(e)=>{setNewPass(e.target.value)}}></input>
                    <div>
                    <button type='button' onClick={changePassword}>Change Password</button>
                    </div>
                    
                </div>
                <div>
                    <h2>Delete Account</h2>
                    <label>Enter your Password</label>
                    <input type='password' value={account} onChange={(e)=>{setAccount(e.target.value)}}></input>
                    <div>
                        <button type='button' id='delete-account' onClick={deleteAccount}>Delete Account</button>
                    </div>
                    
                </div>
            </main>
            <Footer></Footer>
            </>
            )
        }
        
      
    </div>
  )
}

export default Settings
