import React, { createContext, useContext, useState } from 'react';
import {ThemeContext} from "../contexts/ThemeContext";

interface User {
    name:string;
}

interface CurrentUserContextProps {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextProps>({
    currentUser: null,
    setCurrentUser: () => {}
});

const Login = (): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser
            }}
        >
            <LoginButton />
        </CurrentUserContext.Provider>
    );
}

function LoginButton() {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const { isLight, light, blue } = useContext(ThemeContext);
    const theme = isLight ? light : blue;

    if (currentUser !== null) {
        return <p style={{background: theme.ui, color: theme.text}}>You logged in as {currentUser.name}.</p>;
    }

    return (
        <Button onClick={() => {
            setCurrentUser({ name: 'Admin' })
        }}>Login</Button>
    );
}
function Button({ children, onClick }:ButtonProps) {
    const { isLight, light, blue } = useContext(ThemeContext);
    const theme = isLight ? light : blue;
    return (
        <button className="button" onClick={onClick} style={{background: theme.ui, color: theme.text}}>
            {children}
        </button>
    );
}

export default Login;