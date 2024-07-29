import {useContext, useEffect, useState,useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';


function UserProfile(){
    const [user,setUser] = useState({});
    const {authState,setAuthState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [navOptions,setNavOptions] = useState(false);
    const optionsRef = useRef(null);





    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    let navigate = useNavigate();
    let {id} = useParams();


    useEffect(()=>{

        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/users/byId/${id}`,{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setUser(response.data); 
                setLoading(false); 
            }) 
        })    

        
    },[id])
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

    const logout = async ()=>{
        axios.get('http://localhost:3001/logout',{withCredentials:true})
        .then((res)=>{
            navigate('/');
        })
        
    }


    return(
        <div id='user-profile-page'>

{
                loading ?
                (
                    <BarLoader
                    color="#000046"
                    loading={loading}
                    cssOverride={override}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                )
                :
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
                        <Link className='link'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <div className='navbar-part-second' >
                        <Link className='link' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{toggleOptions(e)}} to={`../profile/${authState.id}`}>{authState.username}&nbsp;&nbsp;<FontAwesomeIcon icon={faUser} /></Link>
                        {navOptions && <div className='profile-options-container ' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{hideOptions(e)}} ref={optionsRef}>
                            <div><a>Settings</a> <span><FontAwesomeIcon icon={faGear} /></span> </div>
                            <div onClick={logout}><a>Logout </a> <span><FontAwesomeIcon icon={faRightFromBracket} /></span> </div>
                        </div>}
                    </div>
                    
                </div>
            </nav>

            <div id='user-profile-general-section'>
                {user.username}
            </div>
            <div id='user-profile-informations-section'>

            </div>
            
                    </>
                )
            }


            
            
        
        </div>
    )
}

export default UserProfile;