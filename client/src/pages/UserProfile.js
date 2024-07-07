import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function UserProfile(){
    const [user,setUser] = useState({});
    const {authState,setAuthState} = useContext(AuthContext);


    const cookies = new Cookies();

    let navigate = useNavigate();
    let {id} = useParams();


    useEffect(()=>{

        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/users/byId/${id}`,{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setUser(response.data);  
            }) 
        })    

        
    },[])

    return(
        <div id='user-profile-page'>
            <nav className="home-navbar">
                <div className="navbar-part">
                    <div className='navbar-section'>
                        <Link className='link' to='/home'>Challenges</Link>
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