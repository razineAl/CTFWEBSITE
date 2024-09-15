import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowRight from '../components/ArrowRight';
import ArrowLeft from '../components/ArrowLeft';
import DifficultySpan from '../components/DifficultySpan';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';



function Home(){
    const {authState,setAuthState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [mored,setMored] = useState(false);
    const [newChallenges,setNewChallenges] = useState([]);
    const [newUsers,setNewUsers] = useState([]);

    const typedRef = useRef(null);
    

    const Months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

    
    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };

    
    let navigate = useNavigate();
    
    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
            axios.get('http://localhost:3001/challenge/newest/6',{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setNewChallenges(response.data); 
            })    
            axios.get('http://localhost:3001/users/newest/5',{withCredentials:true,headers:{'Authorization':`Bearer ${res.data.accessToken}`}})
            .then((response)=>{
                setNewUsers(response.data); 
                setLoading(false);
            })    
        })
        
    },[])
    
    useEffect(() => {

        if (typedRef.current) {
            const options = {
                strings: [
                  'Welcome to Elmore CTF',
                  'Where all the cybersecurity enthusiasts meet',
                  'Learn by solving challenges of various categories',
                  'Both server-side and client-side web security challenges',
                  'Forensics, Cryptography, Reverse Engineering and much more !'
                ],
                typeSpeed: 35,
                backSpeed: 20,
                backDelay: 1000,  
                loop: true,
              };
              
              const typed = new Typed(typedRef.current, options);
    
              return () => {
                typed.destroy();
              };
        }

              
    }, [typedRef.current]);

       
    const settings = {
        dots: false,
        infinite: false,
        speed: 650,
        slidesToShow: 3,
        slidesToScroll: 2,
        nextArrow:<ArrowRight/>,
        prevArrow:<ArrowLeft/>

    };
    const getTime = (time) => {

        let creationTime = new Date(time).getTime();
        let actualTime = new Date().getTime();
        let result = actualTime - creationTime;

        const seconds = Math.floor(result / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
    
    return(
        
        
        <div id='home'>
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
            <div id='main-typing-container'>
                <span><h2 className='typed-text' ref={typedRef}></h2></span>
            </div>
            <div id='home-main-content' className='slider-container'>
                
                    <h2 className='new-challenge-heading'>Our latest challenges</h2>
                    <Slider {...settings}>
                        {newChallenges.map((challenge,index)=>{
                            return(
                                <div key={index} className='new-challenge' onClick={()=>{navigate(`../challenge/${challenge._id}`)}}>
                                    <div className='new-challenge-content'>
                                        <div className='new-challenge-first-half'>
                                            {challenge.title}
                                        </div>
                                        <div className='new-challenge-second-half'>
                                            <div className={`new-challenge-category color${challenge.difficulty}`}>{challenge.category}</div>
                                            <div className={`new-challenge-creation-text`}>created { getTime(challenge.creationDate)}</div>
                                            <DifficultySpan difficulty={challenge.difficulty}></DifficultySpan>
                                        </div>
                                    </div>
                                    
                                </div>
                            )

                        })}
                    </Slider>
                    <div id='home-faq-parent'>
                <div id='home-faq-container'>
                    <h2>What is a CTF ?</h2>
                    <div id='home-faq-inside'>
                        <p>A CTF is a challenge in cybersecurity where the goal is to find a piece of information called flag and submit it. In order to find it you have to employ your knowledge in many fields including web hacking, reverse engineering and many others...</p>
                        <Link to='/faq' className='more' onMouseOver={()=>{setMored(true)}} onMouseOut={()=>{setMored(false)}}>Read More<span className={mored ? 'mored' : ''}><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                    </div>
                </div>
                <div id='new-users-container'>
                    <h3>New Members</h3>
                    <ul id='new-users-list'>
                        {
                            newUsers.map((newUser,index)=>{
                                const date = new Date(newUser.creationDate);
                                return (
                                    <li key={index} className='new-user'><p className='membership-name'>{newUser.username}</p><p className='membership-date'>{`${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`}</p></li>
                                )
                            })
                        }
                    </ul>
                </div>
                </div>
                

                
                  
            </div>
            <Footer></Footer>
                </>
            )
            

            }
        </div>

    );
}

export default Home;