import { gql} from "@apollo/client"

const DELETE_PERSON = gql`
mutation DeletePerson($deletePersonId: ID!) {
  deletePerson(id: $deletePersonId)
}
`;

export default DELETE_PERSON;