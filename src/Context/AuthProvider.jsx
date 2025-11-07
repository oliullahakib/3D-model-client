import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUserProfile =(userObj)=>{
        return updateProfile(user,userObj)
    }
    const loginWithGoogle = ()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const logoutUser = ()=>{
        return signOut(auth)
    }

    useEffect(() => {
      const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
      })
    
      return unsubcribe
    }, [])
    
    const value = {
        createUser,
        logoutUser,
        loginUser,
        loginWithGoogle,
        user,
        loading,
        setLoading,
        updateUserProfile

    }
    return <AuthContext value={value} >
        {children}
    </AuthContext>
};

export default AuthProvider;