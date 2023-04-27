import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import CreatePerson from "./CreatePerson";
import CreateAddress from "./CreateAddress";
import AddPersonToAddress from "./AddPersonToAddress";
import RemovePersonFromAddress from "./RemovePersonFromAddress";

export default function AdminViewer () {
    const {user} = useContext(UserContext)

    return user.roles.includes("admin") && user.isLoggedIn ?
        <>
            <CreatePerson/>
            <CreateAddress/>
            <AddPersonToAddress/>
            {/*TODO:Remove person from and address doesn't work*/}
            {/*<RemovePersonFromAddress/>*/}
        </>
        : <></>
}