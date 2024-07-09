import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Rankings from './Rankings';


function Challenges(){
    const {authState,setAuthState} = useContext(AuthContext);
    const [challenges,setChallenges] = useState([]);
    const [effChallenges,setEffChallenges] = useState([]);
    const [trace_challenge,setTrace_challenge] = useState({category:'All',difficulty:'All'});
    const [visible,setVisible] = useState(false);
    const [filtered,setFiltered] = useState(false);
    const [chosen,setChosen] = useState({});

    const individualChallenge = useRef(null);


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
    const triggerChallenge = (challenge)=>{
        setVisible(true);
        setChosen(challenge);
        setFiltered(true);


    }
    const handleCanceling = (e)=>{
        
        if (individualChallenge.current && !individualChallenge.current.contains(e.target)) {
            setVisible(false);
            setFiltered(false);
        }
    }
    return(
        <div id='home' onClick={(e)=>{handleCanceling(e)}}>
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
                    <Link className='link' to={`../profile/${authState.id}`}>{authState.username+" >"}</Link>
                </div>
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
                    <div className='challenge-container' key={index} onClick={()=>{triggerChallenge(challenge)}}>
                        <div className='challenge-header'><p>{challenge.category}</p><span className={`bg-color${challenge.difficulty}`}>{challenge.difficulty}</span></div>
                        <div className={`challenge-body color${challenge.difficulty}`}>{challenge.title}</div>
                        <div className='challenge-footer'>{challenge.points} points</div>
                    </div>
                )
            })}
            </div>

            <div className={filtered ? 'filtered' : 'non-filtered'} id='challenge-modal'>
            {visible && <div id='triggered-challenge-container' ref={individualChallenge}>
                    <div id='tr-challenge-header'>
                        {chosen.title}
                    </div>    
                    <div id='tr-challenge-body'>
                        <p>{chosen.body + "."} <a href={chosen.url} target='blank'>Link to the challenge</a></p>
                    </div>    
                    <div id='tr-challenge-footer'>
                        {chosen.difficulty}
                    </div>    
                </div>}
            </div>
        
        </div>
    );
}

export default Challenges;