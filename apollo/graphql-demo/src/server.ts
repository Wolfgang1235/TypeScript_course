import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./schema";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Rating from "./resolvers/rating";
import Book from "./resolvers/book";
import {books, ratings} from "./data";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {

};

interface MyContext {
    books: typeof books;
    ratings: typeof ratings;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Rating,
        Book
    },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    context: async() => ({
        books, ratings
    }),
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);