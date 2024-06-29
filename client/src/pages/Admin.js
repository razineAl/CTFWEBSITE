import {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Admin(){

    const {authState,setAuthState} = useContext(AuthContext);
    const cookies = new Cookies();
    let navigate = useNavigate();
    const refreshToken = cookies.get('refreshToken');
    useEffect(()=>{
            axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
            .then((res)=>{
                setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});    
            })
        },[]);

    if (authState.role ==! 'Admin') {
        navigate('/home');
    }
    
    
    

    return(
        <div id='admin-page'>
            Welcome to the Admin Page 
        </div>
  
    );
}

export default Admin;