import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


function Rankings(){
    const [topUsers,setTopUsers] = useState([]);
    const {authState,setAuthState} = useContext(AuthContext);


    let navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(()=>{

        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/users/top/10',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setTopUsers(response.data);  
            })    
        })
    
        
    },[])

    const goToProfile = (user)=>{
        navigate(`../profile/${user._id}`);
    }
    return(
        <div id='ranking-page'>
            <nav id="home-navbar">
                <Link className='link' to='/home'>Challenges</Link>
                <Link className='link' to='/ranking'>Rankings</Link>
                <Link className='link'>More</Link>
                <Link className='link'>Settings</Link>
            </nav>
            <div id='ranking-tab'>
                <div className='top-player-section top-player-section-title'>
                    <div className='top-player-username-container'>Username</div>
                    <div className='top-player-points-container'>Points</div>
                </div>
                {
                    
                    topUsers.map((topUser,index)=>{
                        return(
                            <div key={index} className='top-player-section' onClick={()=>{goToProfile(topUser)}}>
                                <div className='top-player-username-container'>{topUser.username}</div>
                                <div className='top-player-points-container'>{topUser.points}</div>
                            </div>
                        )
                    })
                }
            </div>
        
        </div>
    )
}

export default Rankings;