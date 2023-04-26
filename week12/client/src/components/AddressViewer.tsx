import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import GET_ADDRESS from "../queries/GetAddress";
import DropDown from "./DropDown";
import PersonCardGrid from "./PersonCardGrid";

const AddressViewer = () => {
    const [addressId, setAddressId] = useState("");

    const { loading, error, data} = useQuery(GET_ADDRESS, {
        variables: { id: addressId},
    });

    if (loading) return <p>Loading ...</p>;
    if (error) {
        return (
            <>
                <DropDown setAddressId={setAddressId} />
                <div className="simplecards">
                    <h1>Address</h1>
                    <PersonCardGrid people={[]}/>
                </div>
            </>
        )
    }

    return (
        <>
            <DropDown setAddressId={setAddressId}/>
            <div className="simplecards">
                <h1>Address: {data.address.street}</h1>
                <PersonCardGrid people={data.address.people} />
            </div>
        </>
    )
}

export default AddressViewer;