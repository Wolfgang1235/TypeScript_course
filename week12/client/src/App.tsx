import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import WithUseQuery from "./components/AddressViewer";
import PeopleViewer from "./components/PeopleViewer";
import ThemeContextProvider from "./contexts/ThemeContext";
import Login from "./components/Login";
import UserContextProvider from "./contexts/UserContext";
import UserGreeting from "./components/UserGreeting";
import Admin from "./components/Admin";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <>
            <ApolloProvider client={client}>
                <ThemeContextProvider>
                    <UserContextProvider>
                        <div>
                            <Login/>
                            <UserGreeting/>
                            <WithUseQuery/>
                            <PeopleViewer/>
                            <Admin/>
                        </div>
                    </UserContextProvider>
                </ThemeContextProvider>
            </ApolloProvider>
        </>
    )
}

export default App
