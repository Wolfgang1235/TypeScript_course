import React, {useContext, useState} from 'react';
import UserContextProvider, {UserContext} from "../contexts/UserContext";


export default function Login() {
    const {user,setUser} = useContext(UserContext);

    return (
        <button onClick={() => {
            setUser({...user, isLoggedIn : !user.isLoggedIn})
        }}>{!user.isLoggedIn ? "Login" : "Logout"}</button>
    );
};