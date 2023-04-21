import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";

export default function UserGreeting () {
    const {user} = useContext(UserContext);

    return (
        user.isLoggedIn ? <p>{user.name} is logged in as {user.role}</p> : <p/>
    )
}