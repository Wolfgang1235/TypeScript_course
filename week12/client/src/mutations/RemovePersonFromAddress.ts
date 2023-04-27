import {gql} from "@apollo/client";

const REMOVE_PERSON_FROM_ADDRESS = gql`
mutation RemovePersonFromAddress($input: PersonAndAddressInput!) {
  removePersonFromAddress(input: $input) {
    street
    zip
  }
}
`;
export default REMOVE_PERSON_FROM_ADDRESS;