import {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Admin(){

    const {authState,setAuthState} = useContext(AuthContext);
    console.log(authState.accessToken);
    

    return(
        <div id='admin-page'>
            Welcome to the Admin Page 
        </div>
  
    );
}

export default Admin;