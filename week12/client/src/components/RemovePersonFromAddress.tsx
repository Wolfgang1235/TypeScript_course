import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import GET_PEOPLE from "../queries/GetPeople";
import REMOVE_PERSON_FROM_ADDRESS from "../mutations/RemovePersonFromAddress";
import GET_ADDRESS from "../queries/GetAddress";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Address, Person} from "../types";
import GET_PERSON from "../queries/GetPerson";

// interface PersonAddressInput {
//     personId:string,
//     addressId:string
// }


export default () => {
    const initialState = {
        personId: "",
        addressId: ""
    }
    const [state, setState] = useState(initialState);
    const [toggle, setToggle] = useState(true);

    const onChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state,[name]:value})
        if (name === "personId") {
            setToggle(false);
            return
        }
    }

    const [mutateFunction] = useMutation(REMOVE_PERSON_FROM_ADDRESS,
        {refetchQueries: [GET_ADDRESS, GET_PERSON]});

    const peopleQuery = useQuery(GET_PEOPLE);

    if (peopleQuery.loading) return <p>Loading...</p>;
    else if (peopleQuery.error)
        return <p>Error: {peopleQuery.error?.message}</p>;


    function GetPerson() {
        const {data, loading, error} = useQuery(GET_PERSON, {
            variables: {personId: state.personId}
        });

        if (loading) return <>Submitting</>;
        if (error) return <>`Submission error! ${error.message}`</>;

        console.log(data)
        return data;
        // return (
        //     <Select labelId="address-select" name="addressId" onChange={onChange}>
        //         {getPerson.data.person.addresses.map((address: Address) => (
        //         <MenuItem key={address.id} value={address.id}>
        //             {address.street}
        //         </MenuItem>
        //     ))}
        //     </Select>
        // )
    }
    const newData = GetPerson();

    console.log(newData)
    const onSubmit = () => {
        mutateFunction({variables: {input: state}});
        setToggle(true);
        setState(initialState);
    }

    return (
        <>
            <h2>Remove person from an address</h2>

            <FormControl sx={{m: 1, minWidth: 120}}>
                <h3>Select Person</h3>
                <Select labelId="person-select" name="personId" onChange={onChange}>
                    {peopleQuery.data.people.map((person: Person) =>

                        <MenuItem key={person.id} value={person.id}>
                            {person.name}
                        </MenuItem>

                    )}

                </Select>
                <h3>Select Address</h3>
                {/*<Select labelId="address-select" name="addressId" onChange={onChange}>*/}
                {/*    {GetPerson().data.person.addresses.map((address: Address) => (*/}
                {/*        <MenuItem key={address.id} value={address.id}>*/}
                {/*            {address.street}*/}
                {/*        </MenuItem>*/}
                {/*    ))}*/}
                {/*    <MenuItem>*/}
                {/*       */}
                {/*    </MenuItem>*/}
                {/*</Select>*/}
                {/*{toggle ? "" :*/}
                {/*    */}
                {/*        */}
                {/*        <Select labelId="address-select" name="addressId" onChange={onChange}>*/}
                {/*            <GetPerson/>*/}
                {/*        </Select>*/}
                {/*        // <button onClick={onSubmit}>Submit</button>*/}
                {/*    }*/}
            </FormControl>
        </>
    )
}