import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
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
  return (
    <div className ="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex justify-between" >
      <img className='w-44'
      src= { LOGO }
      alt="logo" />
      {
        user && (
        <div className='flex p-2'>
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