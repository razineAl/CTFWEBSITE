import axios from 'axios';
import React, { useContext, useEffect, useState,useRef } from 'react';
import AuthContext from '../helpers/AuthContext';
import { useParams,Link, useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import DifficultySpan from '../components/DifficultySpan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';


function ChallengePage() {

    const {authState,setAuthState} = useContext(AuthContext);
    const [challenge,setChallenge] = useState({});
    const [loading,setLoading] = useState(true);
    const [correct,setCorrect] = useState(false);
    const [flag,setFlag] = useState('');
    const [wrong,setWrong] = useState(false);
    const [solved,setSolved] = useState(false);
    const {id} = useParams();

    const [navOptions,setNavOptions] = useState(false);
    const optionsRef = useRef(null);

    const difficultyLevels = ['Very Easy','Easy','Medium','Hard','Extremely Hard']


    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    const navigate = useNavigate();


    useEffect(()=>{
        axios.get('http://localhost:3002/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get(`http://localhost:3002/challenge/${id}`,{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
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
        axios.put(`http://localhost:3002/challenge/submit/${id}/${authState.id}`,{flag:flag},{withCredentials:true,headers:{'Authorization':`Bearer ${authState.accessToken}`}})
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
            <Navbar></Navbar>
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
                            <h3>Category</h3>
                            <p>{challenge.category}</p>
                        </div>
                        <div id='difficulty-div'>
                            <h3>Difficulty</h3>
                            <p>{difficultyLevels[challenge.difficulty-1]}</p>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                        </div>
                        <div>
                            <a href={challenge.url} target='_blank'>Start Challenge</a>
                        </div>
                    </main>
                    <aside id='challenge-details-aside'>
                        <h2>Flag Submission ({challenge.points} points)</h2>
                        <div id='challenge-submission-form'>
                            <input type='text' value={flag} onChange={(e)=>{setFlag(e.target.value)}} placeholder='Enter the Flag'></input>
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
                                                <p>Correct, But you already solved it&nbsp;&nbsp;:/</p>
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
