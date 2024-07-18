import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../helpers/AuthContext';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';


function ChallengePage() {

    const {authstate,setAuthState} = useContext(AuthContext);
    const [challenge,setChallenge] = useState({});
    const {id} = useParams();
    const cookies = new Cookies();

    const refreshToken = cookies.get('refreshToken');

    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/challenge/${id}`,{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenge(response.data);   
            }) 
            .catch((error)=>{
                console.log(error);
            })   
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div id='main-challenge-page'>
      
    </div>
  )
}

export default ChallengePage
