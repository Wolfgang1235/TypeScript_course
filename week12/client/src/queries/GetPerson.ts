import {gql} from "@apollo/client";
const GET_PERSON = gql`
query GetPerson($personId: ID) {
  person(id: $personId) {
    id
    name
    age
    url
    addresses {
      id
      street
      zip
    }
  }
}
`;
export default GET_PERSON;