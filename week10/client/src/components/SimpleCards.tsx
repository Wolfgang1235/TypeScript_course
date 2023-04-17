import {useEffect, useState} from "react";
import {Person} from "../types";
import {ApolloClient, NormalizedCacheObject, useQuery} from "@apollo/client";
import ClientGetPeople from "../queries/ClientGetPeople";
import PersonCardGrid from "./PersonCardGrid";

const SimpleCards = ({client}:{client:ApolloClient<NormalizedCacheObject>}) => {
    const [people, setPeople] = useState<Person[]>([]);
    useEffect(()=> {
        (async () => {
            const result = await client.query(ClientGetPeople);
            setPeople(result.data.people)
        })();
    },[]);

    return (
        <div className="simplecards">
            <h2>All People</h2>
            <PersonCardGrid people={people} />
        </div>
    )
};

export default SimpleCards;