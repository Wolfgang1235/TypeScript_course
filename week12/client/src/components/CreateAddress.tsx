import React, {ChangeEvent, useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import CREATE_ADDRESS from "../mutations/CreateAddress";
import GET_ADDRESSES from "../queries/GetAddresses";
import {ThemeContext} from "../contexts/ThemeContext";

export  default () => {
    const initialState = {
        street:"",
        zip:0
    }
    const [address, setAddress] =
        useState(initialState);

    const {isLight, light, dark} = useContext(ThemeContext);
    const theme = isLight ? light : dark;

    const [mutateFunction, {data,loading, error}] =useMutation(CREATE_ADDRESS,
        {refetchQueries: [GET_ADDRESSES]});

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
            <input type="text" name="street" placeholder="Enter street name" value={address.street} onChange={onChange}
                   style={{background:theme.bg, color:theme.color}}/>
            <input type="number" name="zip" placeholder="Enter zipcode" value={address.zip} onChange={onChange}
                   style={{background:theme.bg, color:theme.color}}/>
            <input type="submit" value="Create new Address"/>
        </form>
    </>
}