import image from '../ElmoreCTF.png';
import {Link,useNavigate }from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../helpers/AuthContext';
import axios from 'axios';
import {useContext, useEffect, useState, useCallback, useRef} from 'react';

function Navbar(){
    const [navOptions,setNavOptions] = useState(false);
    const optionsRef = useRef(null);
    const {authState,setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();
    const logout = async ()=>{
        axios.get('http://localhost:3002/logout',{withCredentials:true})
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
    
    return(
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
                        <Link className='link' to='/faq'>FAQ</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/blog'>Blog</Link>
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
        </>
    );
}

export default Navbar;