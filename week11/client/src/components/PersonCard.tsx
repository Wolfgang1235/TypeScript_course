import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Person} from "../types";
import {useMutation} from "@apollo/client";
import DELETE_PERSON from "../mutations/DeletePerson";
import GET_PEOPLE from "../queries/GetPeople";

export default ({person}:{person:Person}) => {

    const [mutateFunction, {data, loading, error}] = useMutation(DELETE_PERSON);

    if (loading) return <>'Submitting ...'</>;
    if (error) return <>`Submission error! ${error.message}`</>;

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this person?")) {
            mutateFunction({variables:{deletePersonId:event.currentTarget.value}})
        }
    }

    return (
        <div>
            <Card sx={{maxWidth:200}} style={{
                display:"block",
                width:"30vw",
                transitionDuration: "0.3s",
                height:"23vw",
                border:"1px solid #ccc",
            }}>
                <CardMedia
                    sx={{height:140}}
                    image={person.url}
                    title={person.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {person.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {person.age}
                    </Typography>
                    <button onClick={onClick} value={person.id}>Delete Person</button>
                </CardContent>
            </Card>
        </div>
    )
}