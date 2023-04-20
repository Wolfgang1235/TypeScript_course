import  { gql} from  "@apollo/client";

export default  {
    query: gql`
    query ClientPeople {
  people {
    id
    name
    url
    age
    addresses {
      id
      street
      zip
    }
  }
}
    `
}