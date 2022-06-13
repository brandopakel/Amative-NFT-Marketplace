import React from "react";
import { useState, useRef } from "react";
import {getDatabase, set, ref, push} from 'firebase/database';
import app from '../Firebase';
import logo from '../brandmark-design.svg';
import boxlogo from '../brandmark-logo.svg';
import './Footer.css';

const Footer = () => {
    const[highlight, setHighlight] = useState(false);
    const[email, setEmail] = useState();
    const[visibile, setVisiblity] = useState(false);

    const emailContainer = useRef(null);
    const submissionContainer = useRef(null);
    const CheckValidity = () => {
        const container = emailContainer.current;
        var validations = {
          email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Please enter a valid email address']
        };
        const validation = new RegExp(validations['email'][0]);
        if(!validation.test(container.value)){
          console.error('Not a valid email');
          return false;
        } else{
          setEmail(container.value);
        }; 
      }
    
      const Push = (e) => {
        e.preventDefault();
        const container2 = submissionContainer.current;
        const db = getDatabase(app);
        const postListRef = ref(db, 'users');
        const newPostRef = push(postListRef);
        set(newPostRef, {
          email : email
        })
        .then(() => {
        })
        .catch(console.error());
    
        console.log('DATA SAVED');
    
        const container = emailContainer.current;
    
        container.value = '';
        setVisiblity(!visibile);
    
        setTimeout(() => {
          container2.style.display = 'none';
        }, 2000);
    }

    return(
        <div class='bg-[#222222] flex flex-row align-middle'>
            <img class='ml-16 mt-20 h-20' src={boxlogo} alt=''/>
            <form className='email-registration' style={{visibility : visibile ? 'hidden' : 'showing'}}>
            <div class='top_text text-white mt-10 font-bold text-2xl'>Stay Connected</div>
            <input ref={emailContainer} class='email_text mt-6' onClick={(e) => e.preventDefault()} type='email' name='email' placeholder='Your Email Address' autoComplete='off' onFocus={() => setHighlight(true)} onBlur={() => setHighlight(false)} style={{outline : 'none', boxShadow : highlight ? '0px 0px 5px 4px #888888' : 'none'}} onChange={CheckValidity}/>
            <button className='email_submit' onClick={Push}>Submit</button>
            <span className='submission-received' ref={submissionContainer} style={{visibility : visibile ? 'visible' : 'hidden', position: 'relative'}}>Submitted</span>
            </form>
        </div>
    )
}

export default Footer;