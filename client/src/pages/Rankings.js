import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function Rankings(){
    const [topUsers,setTopUsers] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3001/users/top/10')
        .then((res)=>{
            setTopUsers(res.data);
        })
    },[])
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
                            <div key={index} className='top-player-section'>
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