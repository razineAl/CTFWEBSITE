import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../helpers/AuthContext';
import Cookies from 'universal-cookie';
import { useParams,Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';


function ChallengePage() {

    const {authState,setAuthState} = useContext(AuthContext);
    const [challenge,setChallenge] = useState({});
    const [loading,setLoading] = useState(true);
    const {id} = useParams();
    const cookies = new Cookies();


    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    const refreshToken = cookies.get('refreshToken');

    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/challenge/${id}`,{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenge(response.data);  
                setLoading(false); 
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
      {
        loading ?
        (
            <BarLoader
                color="#000046"
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
        :
        (
            <>
            <nav className="home-navbar">
                <div className="navbar-part">
                    <div className='navbar-section'>
                        <Link className='link' to='/home'>Home</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/challenges'>Challenges</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/ranking'>Rankings</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link'>Premium</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <Link className='link' to={`../profile/${authState.id}`}>{authState.username}</Link>
                </div>
            </nav>
            <div id='challenge-details-container'>
                
                <main id='challenge-details'>
                    <main id='challenge-details-main'>
                        <div id='challenge-details-header'>
                            <h2>{challenge.title}</h2>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <p>{challenge.body}</p>
                        </div>
                        <div>
                            <a href={challenge.url} target='_blank'>Start Challenge</a>
                        </div>
                    </main>
                    <aside id='challenge-details-aside'>
                        <h2>Flag Submission</h2>
                        <div id='challenge-submission-form'>
                            <input type='text'></input>
                            <button type='submit'>Submit Flag</button>
                        </div>
                        
                    </aside>
                </main>
                
                
                
            </div>

            </>
        )
      }
    </div>
  )
}

export default ChallengePage
