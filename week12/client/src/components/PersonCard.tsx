import React, {ChangeEvent, useContext, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Person} from "../types";
import {useMutation} from "@apollo/client";
import DELETE_PERSON from "../mutations/DeletePerson";
import GET_PEOPLE from "../queries/GetPeople";
import {UserContext} from "../contexts/UserContext";
import GET_ADDRESS from "../queries/GetAddress";
import UPDATE_PERSON from "../mutations/UpdatePerson";

interface ArgsPersonInput {
    personId:string,
    personInput: {
        name:string,
        age:number,
        url:string
    }
}

export default ({person}:{person:Person}) => {
    const {user} = useContext(UserContext);
    const [toggle, setToggle] = useState(true);
    const [personInput, setPersonInput] = useState({
        name:person.name,
        age:person.age,
        url:person.url
    });

    const onChange = (event:ChangeEvent<HTMLInputElement>)=> {
        const value= event.target.value;
        const key = event.target.id;
        if (key === "age") {
            setPersonInput({...personInput, [key]:parseInt(value)})
            return
        }
        setPersonInput({...personInput,[key]:value})
    };

    function DeletePerson({personId}:{personId:String}) {
        const [deletePerson] = useMutation(DELETE_PERSON, {
            variables: {deletePersonId: personId},
            refetchQueries: [GET_PEOPLE, GET_ADDRESS]
        });
        return <button onClick={() => deletePerson()} value={person.id}>Delete Person</button>
    };

    function UpdatePerson(args:ArgsPersonInput) {
        const [updatePerson] = useMutation(UPDATE_PERSON, {
            variables: {updatePersonId:args.personId, input:args.personInput},
            refetchQueries: [GET_PEOPLE, GET_ADDRESS]
        });
        return (
            toggle ? <button onClick={() => setToggle(!toggle)}>Edit</button> : <button onClick={() =>
                updatePerson().then(() => setToggle(!toggle) )
            } value={person.id}>Update Person</button>
        )
    }

    return (
        <div>
            <Card sx={{maxWidth:200}} style={{
                display:"block",
                width:"30vw",
                transitionDuration: "0.3s",
                height:"31vw",
                border:"1px solid #ccc",
            }}>
                <CardMedia
                    sx={{height:250}}
                    image={person.url}
                    title={person.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {toggle ? person.name : <input id="name" type="text"
                                                       placeholder={person.name} onChange={onChange}/>}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {toggle ? person.age : <input id="age" type="number"
                                                      placeholder={String(person.age)} onChange={onChange}/>}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {toggle ? <></> : <input id="url" type="text"
                                                 placeholder="url" onChange={onChange}/>}
                    </Typography>
                    {user.isLoggedIn && user.roles.includes("admin") && <UpdatePerson personId={person.id}
                                                                                      personInput={personInput} />}
                    {user.isLoggedIn && user.roles.includes("admin") && <DeletePerson personId={person.id} />}
                </CardContent>
            </Card>
        </div>
    )
}