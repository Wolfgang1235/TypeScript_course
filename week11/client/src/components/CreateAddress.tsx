import React, {ChangeEvent, useState} from "react";
import {useMutation} from "@apollo/client";
import CREATE_ADDRESS from "../mutations/CreateAddress";

export  default () => {
    const initialState = {
        street:"",
        zip:0
    }

    const [address, setAddress] =
        useState(initialState);

    const [mutateFunction, {data,loading, error}] =useMutation(CREATE_ADDRESS);

    if (loading) return <>'Submitting ...'</>;
    if (error) return <>`Submission error! ${error.message}`</>;

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutateFunction({variables:{input:address}})
        setAddress(initialState)
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        if (name === "zip") {
            setAddress({...address, [name]:parseInt(value)});
            return;
        }
        setAddress({...address, [name]:value});
    }

    return <>
        <form onSubmit={onSubmit}>
            <h2>Create a new address</h2>
            <input type="text" name="street" placeholder="Enter street name" value={address.street} onChange={onChange}/>
            <input type="number" name="zip" placeholder="Enter zipcode" value={address.zip} onChange={onChange}/>
            <input type="submit" value="Create new Address"/>
        </form>
    </>
}