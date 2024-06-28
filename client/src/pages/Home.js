import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../helpers/AuthContext';
import { Link, BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Home(){
    const [challenges,setChallenges] = useState([]);
    const [effChallenges,setEffChallenges] = useState([]);
    const {authState,setAuthState} = useContext(AuthContext);
    const cookies = new Cookies();
    var trace_challenge = {
        category:"All",
        difficulty:"All"
    }
    let navigate = useNavigate();
    
    useEffect(()=>{
        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id});
            axios.get('http://localhost:3001/challenge/all',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenges(response.data);
                setEffChallenges(response.data);   
            })    
        })
        
    },[])

    const filterByCategory = (e)=>{
        trace_challenge.category = e.target.value;
        if (e.target.value == 'All') {
            if (trace_challenge.difficulty == 'All') {
                setEffChallenges(challenges);
            } else {
                setEffChallenges(challenges.filter(challenge => challenge.difficulty == trace_challenge.difficulty));
            }
            
        } else {
            setEffChallenges(challenges.filter(challenge => (challenge.category == e.target.value) && (challenge.difficulty == 'All') ));
        }   
    }
    const filterByDifficulty = (e)=>{
        trace_challenge.difficulty = e.target.value;
        if (e.target.value == 'All') {
            setEffChallenges(challenges.filter(challenge => challenge.category == trace_challenge.category));
        } else {
            setEffChallenges(challenges.filter(challenge => (challenge.difficulty == e.target.value) && (challenge.category == trace_challenge.category) ));
        }    
    }
    

    return(
        <div id='home'>
  
            <nav id="home-navbar">
                <Link className='link' to='/home'>Challenges</Link>
                <Link className='link' to='/ranking'>Rankings</Link>
                <Link className='link'>More</Link>
                <Link className='link'>{authState.username+">"}</Link>
            </nav>
            

            <aside id='categories-side-panel'>
                <label htmlFor='categories'>Categories</label>
                <select name='categories' id='categories' onChange={(e)=>{filterByCategory(e)}}>
                    <option>All</option>
                    <option>Forensics</option>
                    <option>Reverse Eng</option>
                    <option>Binary Exp</option>
                    <option>general</option>
                </select>
                <label htmlFor='difficulty'>Difficulty</label>
                <select name='difficulty' id='difficulty' onChange={(e)=>{filterByDifficulty(e)}}>
                    <option>All</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </aside>
            <div id='challenges'>
            {effChallenges.map((challenge,index)=>{
                return(
                    <div className='challenge-container' key={index}>
                        <div className='challenge-header'><p>{challenge.category}</p><span className={`bg-color${challenge.difficulty}`}>{challenge.difficulty}</span></div>
                        <div className={`challenge-body color${challenge.difficulty}`}>{challenge.title}</div>
                        <div className='challenge-footer'>{challenge.points} points</div>
                    </div>
                )
            })}
            </div>
        
        </div>
    );
}

export default Home;