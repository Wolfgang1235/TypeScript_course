import {gql} from "@apollo/client";

const GET_PEOPLE = gql`
query GetPeople {
  people {
    id
    name
    url
  }
}
`;

export default GET_PEOPLE;