const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
 
  type Person {
    id: ID!
    name: String
    age: Int
    url: String
    addresses: [Address]
  }

  type Address {
    id: ID!
    street: String
    zip: Int
    people: [Person]
  }  
  
  type Query {
    people: [Person]
    addresses: [Address]
    person(id: ID): Person
    address(id: ID): Address
  }
  
  type DeletedPerson {
    id: ID!
  }
  
  type Mutation {
    createPerson(input: PersonInput!): Person
    createAddress(input: AddressInput!): Address
    addPersonToAddress(input: PersonAndAddressInput!): Address
    removePersonFromAddress(input: PersonAndAddressInput!): Address
    deletePerson(id: ID!): DeletedPerson
    updatePerson(id: ID!, input: UpdatePersonInput!): Person
  }
  
  input PersonInput {
    name: String!
    age: Int!
    url: String!
    addressId: ID
  }
  
  input AddressInput {
    street: String!
    zip: Int!
    personId: ID
  }
  
  input PersonAndAddressInput {
    personId: ID!
    addressId: ID!
  }
  
  input UpdatePersonInput {
    name: String
    age: Int
    url: String
  }
  
`;

export default typeDefs;