import {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Home(){
    const [challenges,setChallenges] = useState([]);
    const [effChallenges,setEffChallenges] = useState([]);
    const [trace_challenge,setTrace_challenge] = useState({category:'All',difficulty:'All'});
    const {authState,setAuthState} = useContext(AuthContext);
    const cookies = new Cookies();
    
    let navigate = useNavigate();
    
    useEffect(()=>{
        const refreshToken = cookies.get('refreshToken');
        axios.get('http://localhost:3001/refresh',{headers:{refreshToken:refreshToken}})
        .then((res)=>{
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/challenge/all',{headers:{accessToken:res.data.accessToken}})
            .then((response)=>{
                setChallenges(response.data);
                setEffChallenges(response.data);   
            })    
        })
        
    },[])
    useEffect(() => {
        let filteredChallenges = challenges;
        if (trace_challenge.category !== "All") {
            filteredChallenges = filteredChallenges.filter(challenge => challenge.category === trace_challenge.category);
        }
        if (trace_challenge.difficulty !== "All") {
            filteredChallenges = filteredChallenges.filter(challenge => challenge.difficulty.toString() === trace_challenge.difficulty);
        }
        setEffChallenges(filteredChallenges);
    }, [challenges, trace_challenge]);

    const filterByCategory = (e)=>{
        setTrace_challenge({difficulty:trace_challenge.difficulty,category:e.target.value});
    }
    const filterByDifficulty = (e)=>{
        setTrace_challenge({difficulty:e.target.value.toString(),category:trace_challenge.category});  
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