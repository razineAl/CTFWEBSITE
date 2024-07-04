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
        axios.get('http://localhost:3001/users/top/3')
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
                {
                    topUsers.map((topUser,index)=>{
                        return(
                            <div key={index} className='top-player-section'>{topUser.username}</div>
                        )
                    })
                }
            </div>
        
        </div>
    )
}

export default Rankings;