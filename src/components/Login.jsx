import React, { useState ,useRef } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { adduser } from '../utils/userSlice';
import { USER_AVARTER } from '../utils/constants';

const Login = () => {
  const[isSignInForm , setIsSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] =useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () =>{
      //validate the form
      console.log(email.current.value);
      console.log(password.current.value);
      const message = checkValidData(email.current.value,password.current.value);
      setErrorMessage(message);
      if(message) return;
      if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: USER_AVARTER ,
          })
          .then(() => {
            const {uid , email, displayName , photoURL} = auth.currentUser;
            dispatch(adduser({
              uid: uid, 
              email: email , 
              displayName: displayName ,
              photoURL: photoURL
            }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
            })
            .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode +"-" + errorMessage); 
          });
        }
      else {
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-"+ errorMessage);
        });

      }



  };
  const toggleSignInForm= ()=>{
    setIsSignInForm(!isSignInForm);

  };
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_large.jpg'
        alt='logo'></img> 
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-black/80">
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input 
          ref = {name}
          type='text' 
          placeholder='Full Name' 
          className='py-4 my-4 w-full bg-gray-800'>
        </input>
      )}
        <input 
          ref = {email}
          type='text' 
          placeholder='Email Address' 
          className='py-4 my-4 w-full bg-gray-800'>
        </input>
        <input
          ref = {password} 
          type='password' 
          placeholder='Password' 
          className='py-4 my-4 w-full bg-gray-800'>
        </input>
        <p className ='text-red-700 font-bold text-xl py-2'>{errorMessage}</p>
        <button className='py-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up Now" : "Already registered ? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login