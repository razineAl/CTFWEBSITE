import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretRight, faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';




function FAQ() {
    const [loading,setLoading] = useState(true);

    const {authState,setAuthState} = useContext(AuthContext);


    const [navOptions,setNavOptions] = useState(false);
    const optionsRef = useRef(null);
    let navigate = useNavigate();

    const override = {
        display: "block",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)"
    };
    
    
    
    useEffect(()=>{
        axios.get('http://localhost:3001/refresh',{ withCredentials: true})
        .then((res)=>{
            if (res.data.error) return navigate('/');
            setAuthState({username:res.data.username,status:true,accessToken:res.data.accessToken,id:res.data.id,role:res.data.role});
    
            setLoading(false);  
        
        })
    
        
    },[])
    
    const logout = async ()=>{
        axios.get('http://localhost:3001/logout',{withCredentials:true})
        .then((res)=>{
            navigate('/');
        })

    }
    const showOptions = (e)=>{
        setNavOptions(true);
    }
    const toggleOptions = (e)=>{
        if (optionsRef.current) {
            if (!optionsRef.current.contains(e.target)) {
                setNavOptions(false)
            } 
        }    
    }
    const hideOptions = (e)=>{
        setNavOptions(false)

    }


    const [faqItems,setFaqItems] = useState([
        {
          question: 'What is a CTF challenge ?',
          answer: 'A CTF is a challenge in CYBERSECURITY where the goal is to find a piece of information called flag and submit it. In order to find it you have to',
          open:true
        },
        {
          question: 'What is CTF for ?',
          answer: 'CTF is a the abbreviation for Catch the FLAG',
          open:false
        },
        {
          question: 'Why Elmore CTF ?',
          answer: 'The Elmore CTF team is working to release two new challenges every week, including CTFs about trending subjects and vulnerabilities',
          open:false
        },
        {
          question: 'How can I start solving challenges ?',
          answer: 'Go to the challenges page through navbar, and read the instructions there',
          open:false
        },
        {
          question: 'Is Elmore CTF Beginner Friendly ?',
          answer: 'Elmore CTF is both for Beginner and more advanced cybersecurity enthusiasts, there are only few hard challenges for the moment, but we will be releasing more of those soon !',
          open:false
        },
        {
          question: 'Is It Free ?',
          answer: 'CTF is a the abbreviation for Catch the FLAG',
          open:false
        },
        {
          question: 'Can I Create a challenge ?',
          answer: 'CTF is a the abbreviation for Catch the FLAG',
          open:false
        },
      ]) ;

    const showAnswer = (index) => {
        setFaqItems(faqItems.map((item, i) => (
          i === index ? { ...item, open: !item.open } : item
        )));
      };



  return (
    <div id='faq-main-page'>
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
                        <Link className='link' to='/billing'>Premium</Link>
                    </div>
                    <div className='navbar-section'>
                        <Link className='link' to='/faq'>FAQ</Link>
                    </div>
                </div>
                <div className='navbar-part'>
                    <div className='navbar-part-second' >
                        <Link className='link' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{toggleOptions(e)}} to={`../profile/${authState.id}`}>{authState.username}&nbsp;&nbsp;<FontAwesomeIcon icon={faUser} /></Link>
                        {navOptions && <div className='profile-options-container ' onMouseOver={(e)=>{showOptions(e)}} onMouseOut={(e)=>{hideOptions(e)}} ref={optionsRef}>
                            <div><a>Settings</a> <span><FontAwesomeIcon icon={faGear} /></span> </div>
                            <div onClick={logout}><a>Logout </a> <span><FontAwesomeIcon icon={faRightFromBracket} /></span> </div>
                        </div>}
                    </div>
                    
                </div>
            </nav>
            <main id='main-faq-content'>
                <h1>What you might be asking yourself about</h1>
                <ul>
                    {faqItems.map((item,index)=>{
                        return(
                        <li key={index}>
                            <div className='faq-question-container' onClick={()=>{showAnswer(index)}} >
                                <span className={item.open ? 'rotate' : ''}><FontAwesomeIcon icon={faCaretRight} /></span><p>&nbsp;&nbsp;&nbsp;&nbsp;{item.question} </p>
                            </div>
                            {
                                    item.open && (
                                    <div className='faq-answer-container'>
                                        <p>{item.answer}</p>
                                    </div>
                                )
                            }
                            
                        </li>
                        )
                        
                    })}
                </ul>
            </main>
           </> 
            )}
        
    </div>
  )
}

export default FAQ
