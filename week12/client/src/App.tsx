import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import WithUseQuery from "./components/WithUseQuery";
import CreatePerson from "./components/CreatePerson";
import CreateAddress from "./components/CreateAddress";
import AddPersonToAddress from "./components/AddPersonToAddress";
import SimpleCards from "./components/SimpleCards";
import ThemeContextProvider from "./contexts/ThemeContext";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <>
        <ApolloProvider client={client}>
            <WithUseQuery/>
            <SimpleCards/>
            <ThemeContextProvider>
                <div>
                    <CreatePerson/>
                    <CreateAddress/>
                    <AddPersonToAddress/>
                </div>
            </ThemeContextProvider>
        </ApolloProvider>
        </>
    )
}

export default App
