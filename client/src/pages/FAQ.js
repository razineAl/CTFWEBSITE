import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretRight, faGear, faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';




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
    
   

    const [faqItems,setFaqItems] = useState([
        {
          question: 'What is a CTF challenge ?',
          answer: 'A CTF is a challenge in cybersecurity where the goal is to find a piece of information called flag and submit it. In order to find it you have to employ your knowledge in many fields including web hacking, reverse engineering and many others... ',
          answerContinuation:'That being said, it is also an excellent way to improve your knowledge in those fields !',
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
                <Navbar></Navbar>
            <main id='main-faq-content'>
                <h1>What you might be asking yourself about</h1>
                <ul>
                    {faqItems.map((item,index)=>{
                        return(
                        <li key={index}>
                            <div className={`faq-question-container ${item.open ? 'open' : ''}`} onClick={()=>{showAnswer(index)}} >
                                <span className={item.open ? 'rotate' : ''}><FontAwesomeIcon icon={faCaretRight} /></span><p>&nbsp;&nbsp;&nbsp;&nbsp;{item.question} </p>
                            </div>
                            {
                                    item.open && (
                                    <div className={`faq-answer-container`}>
                                        <p>{item.answer}</p>
                                        {
                                            item.answerContinuation && (
                                                <p className='faq-answer-continuation'>{item.answerContinuation}</p>
                                            )
                                        }
                                        
                                    </div>
                                )
                            }
                            
                        </li>
                        )
                        
                    })}
                </ul>
            </main>
            <Footer></Footer>
           </> 
            )}
        
    </div>
  )
}

export default FAQ
