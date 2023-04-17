import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import GetAddress from "../queries/GetAddress";
import {Address} from "../types";
import DropDown from "./DropDown";
import PersonCardGrid from "./PersonCardGrid";

const AddressViewer = () => {
    const [address, setAddress] =
        useState<Address>({id:"643d0892b4570ac8d7f108b2", street:"A place", zip:3000, people:[]});

    const { loading, error, data} = useQuery(GetAddress, {
        variables: { id: address.id},
    });

    if (loading) return <p>Loading ...</p>;

    return (
        <>
            <DropDown setAddress={setAddress} address={address} />
            <div className="simplecards">
                <h1>Address: {data.address.street}</h1>
                <PersonCardGrid people={data.address.people} />
            </div>
        </>
    )
}

export default AddressViewer;