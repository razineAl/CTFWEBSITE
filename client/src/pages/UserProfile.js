import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';


function UserProfile(){
    const [user,setUser] = useState({});
    const {authState,setAuthState} = useContext(AuthContext);


    const cookies = new Cookies();

    let navigate = useNavigate();
    let {id} = useParams();


    useEffect(()=>{

        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/users/byId/${id}`,{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setUser(response.data);  
            }) 
        })    

        
    },[])

    return(
        <div id='user-profile-page'>
            
        
        </div>
    )
}

export default UserProfile;