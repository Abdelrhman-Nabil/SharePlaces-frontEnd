import { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext=createContext({
    isLoggedIn:false,
    userId:null,
    token:null,
    login:()=>{},
    logOut:()=>{}
})

let logOutTimer;
export const AuthProvider=({children})=>{
    const[token,setToken]=useState(false)
    const[userId,setUserId]=useState(null)
    const[tokenExpiration1Date,setTokenExpiration1Date]=useState();
    const login=useCallback((uid ,token ,expirationData)=>{
        setToken(token)
        setUserId(uid)
    const tokenExpirationDate= expirationData || new Date(new Date().getTime() + 1000 *60 * 60 )
        setTokenExpiration1Date(tokenExpirationDate)
        localStorage.setItem('userData',JSON.stringify({userId:uid ,token:token,expiration:tokenExpirationDate.toISOString()}))
    },[])
     const logOut=useCallback(()=>{
        setToken(null)
        setUserId(null)
        setTokenExpiration1Date(null)
        localStorage.removeItem('userData')

    },[])
    useEffect(()=>{
        if(token && tokenExpiration1Date){
            const reminingTime=tokenExpiration1Date.getTime() - new Date().getTime();
            logOutTimer=setTimeout(logOut,reminingTime)
        }else{
            clearTimeout(logOutTimer );
        }
    },[logOut,token ,tokenExpiration1Date])
   const value={isLoggedIn:!!token,token:token,login,logOut,userId};

   return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
   )
}

