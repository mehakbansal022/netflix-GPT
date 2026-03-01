import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toogleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate("/");
    })
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid , email,displayName , photoURL} = user;
          dispatch(adduser({
            uid: uid, 
            email: email , 
            displayName: displayName ,
            photoURL: photoURL}));
            navigate("/browse");
  
        } else {
          dispatch(removeuser());
          navigate("/");
          }
        });
        return () => unSubscribe();
      },[]);

  const handleGptSearchClick = () => {
    dispatch(toogleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
   }
  
  return (
    <div className ="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between" >
      <img className='w-44'
      src= { LOGO }
      alt="logo" />
      {
        user && (

          <div className='flex p-2'>
            {showGptSearch && (
              <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>)}
            <button className='px-2 py-2 mx-4 my-2 bg-purple-800 text-white rounded-lg' 
            onClick={handleGptSearchClick}>
              {showGptSearch ? "Home Page" : "GPT Search"}</button>
            <img className ="w-12 h-12" 
            alt= " usericon" 
            src= {user?.photoURL}></img>
            <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>
          </div>
      )}
      
      
    </div>
  )
}

export default Header