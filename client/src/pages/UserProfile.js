import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';


function UserProfile(){
    const [user,setUser] = useState({});
    const {authState,setAuthState} = useContext(AuthContext);



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
            }) 
        })    

        
    },[id])


    return(
        <div id='user-profile-page'>
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
                        <Link className='link'>Premium</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <Link className='link' to={`../profile/${authState.id}`}>{authState.username+" >"}</Link>
                </div>
            </nav>

            <div id='user-profile-general-section'>
                {user.username}
            </div>
            <div id='user-profile-informations-section'>

            </div>
            
        
        </div>
    )
}

export default UserProfile;