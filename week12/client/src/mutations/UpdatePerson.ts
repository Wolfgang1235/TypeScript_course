import {gql} from "@apollo/client";
const UPDATE_PERSON = gql`
mutation UpdatePerson($updatePersonId: ID!, $input: UpdatePersonInput!) {
  updatePerson(id: $updatePersonId, input: $input) {
    id
    name
    age
    url
  }
}
`;

export default UPDATE_PERSON;