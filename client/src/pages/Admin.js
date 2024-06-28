import {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Admin(){
    
    

    return(
        <div id='admin-page'>

        </div>
  
    );
}

export default Admin;