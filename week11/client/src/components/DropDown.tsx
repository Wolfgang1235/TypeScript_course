import React from "react";
import {useQuery} from "@apollo/client";
import GetAllAddresses from "../queries/GetAddresses";
import {Address} from "../types";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Props = {
    setAddress: (address: Address) => void;
    address: Address;
};

export default function DropDown({setAddress, address}: Props) {
    const query = useQuery(GetAllAddresses);
    if (query.loading) return <p>Loading ...</p>;
    else if (query.error) return <p>Error: {query.error.message}</p>;

    const handleChange = (event: SelectChangeEvent<string>):void => {
        const selected = query.data.addresses.find((address:Address):boolean => address.id === event.target.value);
        setAddress(selected);
    };
    return (
        <div>
            <FormControl sx={{m:1, minWidth:120}}>
                <InputLabel id="demo-simple-select-helper-label">Address</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={address.id}
                    label="Address"
                    onChange={handleChange}>
                    {query.data.addresses.map((address:Address)=><MenuItem key={address.id} value={address.id}>
                        {address.street}
                    </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}