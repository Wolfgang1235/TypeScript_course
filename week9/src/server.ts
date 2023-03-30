import * as dotenv from 'dotenv'
dotenv.config({path:'./.env'});
import * as mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Person from "../models/personModel";

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);
mongoose.connect(DB, {
}).then(() => console.log('DB connection has succeed!'));

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
 
  type Person {
    id: ID!
    name: String
    age: Int
    city: String
  }  
    
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    people: [Person]
  }
`;

const people = await Person.find()

export const resolvers = {
    Query: {
        people: () => people,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const port = parseInt(process.env.PORT!);

const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);




