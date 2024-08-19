import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';

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


    const logout = async ()=>{
        axios.get('http://localhost:3001/logout',{withCredentials:true})
        .then((res)=>{
            navigate('/');
        })
        
    }
    const showOptions = (e)=>{
        setNavOptions(true);
    }
    const toggleOptions = (e)=>{
        if (optionsRef.current) {
            if (!optionsRef.current.contains(e.target)) {
                setNavOptions(false)
            } 
        }    
    }
    const hideOptions = (e)=>{
        setNavOptions(false)
  
    }
    const goToSettings = ()=>{
        navigate(`/account/settings/${authState.id}`);
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
            <nav className="home-navbar">
                <div className="navbar-part">
                    <div className='navbar-section'>
                        <Link className='link' to='/home'>Home</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/challenges'>Challenges</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/ranking'>Rankings</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/billing'>Premium</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/faq'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <div className='navbar-part-second' >
                        <Link className='link' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{toggleOptions(e)}} to={`../profile/${authState.id}`}>{authState.username}&nbsp;&nbsp;<FontAwesomeIcon icon={faUser} /></Link>
                        {navOptions && <div className='profile-options-container ' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{hideOptions(e)}} ref={optionsRef}>
                            <div onClick={goToSettings}><a>Settings</a> <span><FontAwesomeIcon icon={faGear} /></span> </div>
                            <div onClick={logout}><a>Logout </a> <span><FontAwesomeIcon icon={faRightFromBracket} /></span> </div>
                        </div>}
                    </div>
                    
                </div>
            </nav>
            <main id='settings-main-page'>
                <div>
                    <h2>Change Username</h2>
                    <label>New Username</label>
                    <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                    <div>
                        <button type='button'>Change Username</button>
                    </div>
                    
                </div>
                <div>
                    <h2>Change Password</h2>
                    <label>Current Password</label>
                    <input type='text' value={oldPass} onChange={(e)=>{setOldPass(e.target.value)}}></input>
                    <label>New Password</label>
                    <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <label>Confirm New Password</label>
                    <input type='text' value={newPass} onChange={(e)=>{setNewPass(e.target.value)}}></input>
                    <div>
                    <button type='button'>Change Password</button>
                    </div>
                    
                </div>
                <div>
                    <h2>Delete Account</h2>
                    <label>Enter your Password</label>
                    <input type='password' value={account} onChange={(e)=>{setAccount(e.target.value)}}></input>
                    <div>
                        <button type='button' id='delete-account'>Delete Account</button>
                    </div>
                    
                </div>
            </main>
            </>
            )
        }
      
    </div>
  )
}

export default Settings