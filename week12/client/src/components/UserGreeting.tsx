import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";

export default function UserGreeting () {
    const {user} = useContext(UserContext);

    return (
        user.isLoggedIn ? <p>{user.name} is logged in as {user.roles[0]} and have the roles:
            {user.roles.sort().map((role) => {
                var randomColor =  Math.floor(Math.random()*16777215).toString(16);
                return <p style={{color:"#"+randomColor}}>{role}</p>
            })}</p> : <></>
    )
}