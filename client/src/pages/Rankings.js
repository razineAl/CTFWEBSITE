import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function Rankings(){

    return(
        <div id='home'>
            <nav id="home-navbar">
                <Link className='link' to={Home}>Challenges</Link>
                <Link className='link' to={Rankings}>Rankings</Link>
                <Link className='link'>More</Link>
                <Link className='link'>Settings</Link>
            </nav>
            <div id='challenges'>
            
            </div>
        
        </div>
    )
}

export default Rankings;