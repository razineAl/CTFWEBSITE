import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../helpers/AuthContext';
import { useParams,Link, useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';


function ChallengePage() {

    const {authState,setAuthState} = useContext(AuthContext);
    const [challenge,setChallenge] = useState({});
    const [loading,setLoading] = useState(true);
    const [correct,setCorrect] = useState(false);
    const [flag,setFlag] = useState('');
    const [wrong,setWrong] = useState(false);
    const [solved,setSolved] = useState(false);
    const {id} = useParams();


    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    const navigate = useNavigate();


    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3001/challenge/${id}`,{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
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
    const submitFlag = ()=>{
        axios.put(`http://localhost:3001/challenge/submit/${id}/${authState.id}`,{flag:flag},{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
        .then((res)=>{
            const response = res.data;
            console.log(response);
            setFlag('');
            if (response.error) {
                if (response.error == "Challenge already solved"){
                    setWrong(false); 
                    setSolved(true);
                    return;
                }
            }
            if (response.answer) {
                setWrong(false);
                setCorrect(true);
            } else {
                setSolved(false);
                setCorrect(false);
                setWrong(true);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
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
                            <input type='text' value={flag} onChange={(e)=>{setFlag(e.target.value)}}></input>
                            <button type='button' onClick={submitFlag}>Submit Flag</button>
                            {
                            wrong && 
                            <div className='incorrect-comment'>
                                <p>Incorrect Flag, please try again !</p>
                            </div> }
                            {
                                correct && <div className='correct-comment'>
                                                <p>Well done, here are your {challenge.points} points :&#41;</p>
                                            </div>
                            }
                            {
                                solved && <div className='solved-comment'>
                                                <p>Correct, But you already solved this challenge :/</p>
                                            </div>
                            }
                            
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
