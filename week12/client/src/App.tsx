import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import WithUseQuery from "./components/WithUseQuery";
import SimpleCards from "./components/SimpleCards";
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
                            <SimpleCards/>
                            <Admin/>
                        </div>
                    </UserContextProvider>
                </ThemeContextProvider>
            </ApolloProvider>
        </>
    )
}

export default App
