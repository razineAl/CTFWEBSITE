import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function Rankings(){
    const [topUsers,setTopUsers] = useState([]);



    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/users/top/10')
        .then((res)=>{
            setTopUsers(res.data);
        })
    },[])

    return(
        <div id='user-profile-page'>
            
        
        </div>
    )
}

export default Rankings;