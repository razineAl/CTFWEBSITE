import {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link,  useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';
import Sidebar from '../components/Sidebar';


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
    if (authState.role !== 'Admin') {
        navigate('/home');
    }

    
    
    

    return(
        <div id='admin-page'>
            <Sidebar>
                <div className='admin-sidebar-sections'>User Management</div>
                <div className='admin-sidebar-sections'>Challenge Management</div>
                <div className='admin-sidebar-sections'>Submissions and Scoring</div>
            </Sidebar>
            <main id='admin-interface'>

            </main>
        </div>
  
    );
}

export default Admin;