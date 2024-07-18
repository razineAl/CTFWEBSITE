import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DifficultySpan from '../components/DifficultySpan';


function Challenges(){
    const {authState,setAuthState} = useContext(AuthContext);
    const [challenges,setChallenges] = useState([]);
    const [effChallenges,setEffChallenges] = useState([]);
    const [trace_challenge,setTrace_challenge] = useState({category:'All',difficulty:'All'});
    const [visible,setVisible] = useState(false);
    const [filtered,setFiltered] = useState(false);
    const [chosen,setChosen] = useState({});
    const [general,setGeneral] = useState(false);
    const [web,setWeb] = useState(false);
    const [reverse,setReverse] = useState(false);
    const [cracking,setCracking] = useState(false);
    const [forensics,setForensics] = useState(false);

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
        <div id='challenges-main-page' onClick={(e)=>{handleCanceling(e)}}>
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

            <div id='challenge-page-welcome'>
                <h1>Solving Challenges in Elmore CTF</h1>
                <p>Choose the category you want to solve challenges in.</p>
                <p>Pick a challenge.</p>
                <p>Solve the challenge by submitting the flag in the dedicated area.<Link to='' className='lien'>What's a flag ?</Link></p>
            </div>
                
            <div id='challenges'>
                <div className='category'>
                    <div className='category-title'><h2>Challenges</h2></div>
                    
                </div>
                <div className='category'>
                    <div className='category-title' onClick={()=>{setGeneral(!general)}}><h3>General<span className='bold'>{` (${effChallenges.filter(challenge=>{return challenge.category == "general"}).length})`}</span></h3></div>
                    <div className={general ? 'category-challenges' : 'category-challenges non-filtered'}>
                    {effChallenges.filter(challenge=>{return challenge.category == "general"}).map((challenge,index)=>{
                    return(
                        <div className={index%2==0 ? `challenge-container odd` : `challenge-container even` } key={index} onClick={()=>{navigate(`../challenge/${challenge._id}`)}}>
                            <div className={``}>{challenge.title}</div>
                            <div className=''><p>{challenge.category}</p></div>            
                            <div className=''>{challenge.solves} solves</div>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                            <div className=''>{challenge.points} points</div>
                            
                        </div>
                    )
                    })}
                    </div>
                </div>
                <div className='category'>
                    <div className='category-title' onClick={()=>{setWeb(!web)}}><h3>Web<span className='bold'>{` (${effChallenges.filter(challenge=>{return challenge.category == "web exploitation"}).length})`}</span> </h3></div>
                    <div className={web ? 'category-challenges' : 'category-challenges non-filtered'}>
                    {effChallenges.filter(challenge=>{return challenge.category == "web exploitation"}).map((challenge,index)=>{
                    return(
                        <div className={index%2==0 ? `challenge-container odd` : `challenge-container even` } key={index} onClick={()=>{triggerChallenge(challenge)}}>
                            <div className={``}>{challenge.title}</div>
                            <div className=''><p>{challenge.category}</p></div>            
                            <div className=''>{challenge.solves} solves</div>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                            <div className=''>{challenge.points} points</div>
                            
                        </div>
                    )
                    })}
                    </div>
                </div>
                <div className='category'>
                    <div className='category-title' onClick={()=>{setCracking(!cracking)}}><h3>Cracking <span className='bold'>{` (${effChallenges.filter(challenge=>{return challenge.category == "Cracking"}).length})`}</span></h3></div>
                    <div className={cracking ? 'category-challenges' : 'category-challenges non-filtered'}>
                    {effChallenges.filter(challenge=>{return challenge.category == "Cracking"}).map((challenge,index)=>{
                    return(
                        <div className={index%2==0 ? `challenge-container odd` : `challenge-container even` } key={index} onClick={()=>{triggerChallenge(challenge)}}>
                            <div className={``}>{challenge.title}</div>
                            <div className=''><p>{challenge.category}</p></div>            
                            <div className=''>{challenge.solves} solves</div>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                            <div className=''>{challenge.points} points</div>
                            
                        </div>
                    )
                    })}
                    </div>
                </div>
                <div className='category'>
                    <div className='category-title' onClick={()=>{setReverse(!reverse)}}><h3>Reverse Engineering<span className='bold'>{` (${effChallenges.filter(challenge=>{return challenge.category == "Reverse Eng"}).length})`}</span></h3></div>
                    <div className={reverse ? 'category-challenges' : 'category-challenges non-filtered'}>
                    {effChallenges.filter(challenge=>{return challenge.category == "Reverse Eng"}).map((challenge,index)=>{
                    return(
                        <div className={index%2==0 ? `challenge-container odd` : `challenge-container even` } key={index} onClick={()=>{triggerChallenge(challenge)}}>
                            <div className={``}>{challenge.title}</div>
                            <div className=''><p>{challenge.category}</p></div>            
                            <div className=''>{challenge.solves} solves</div>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                            <div className=''>{challenge.points} points</div>
                            
                        </div>
                    )
                    })} 
                    </div>
                </div>
                <div className='category'>
                    <div className='category-title' onClick={()=>{setForensics(!forensics)}}><h3>Forensics<span className='bold'>{` (${effChallenges.filter(challenge=>{return challenge.category == "forensics"}).length})`}</span></h3></div>
                    <div className={forensics ? 'category-challenges' : 'category-challenges non-filtered'}>
                    {effChallenges.filter(challenge=>{return challenge.category == "forensics"}).map((challenge,index)=>{
                    return(
                        <div className={index%2==0 ? `challenge-container odd` : `challenge-container even` } key={index} onClick={()=>{triggerChallenge(challenge)}}>
                            <div className={``}>{challenge.title}</div>
                            <div className=''><p>{challenge.category}</p></div>            
                            <div className=''>{challenge.solves} solves</div>
                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                            <div className=''>{challenge.points} points</div>
                            
                        </div>
                    )
                    })}
                    </div>
                </div>
            
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