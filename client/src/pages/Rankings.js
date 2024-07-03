import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function Rankings(){
    const [topUsers,setTopUsers] = useState([]);
    return(
        <div id='ranking-page'>
            <nav id="home-navbar">
                <Link className='link' to='/home'>Challenges</Link>
                <Link className='link' to='/ranking'>Rankings</Link>
                <Link className='link'>More</Link>
                <Link className='link'>Settings</Link>
            </nav>
            <div id='ranking-tab'>

            </div>
        
        </div>
    )
}

export default Rankings;