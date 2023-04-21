import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import CreatePerson from "./CreatePerson";
import CreateAddress from "./CreateAddress";
import AddPersonToAddress from "./AddPersonToAddress";

export default function AdminViewer () {
    const {user} = useContext(UserContext)

    if (user.role === "admin" && user.isLoggedIn) {
        return (
            <div>
                <CreatePerson/>
                <CreateAddress/>
                <AddPersonToAddress/>
            </div>
        )
    } else {
        return <></>
    }
}