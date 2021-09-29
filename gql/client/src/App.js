import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const App = () => {
  const [posts, setPosts] = useState([]);
  client
    .query({
      query: gql`
        {
          allPosts {
            id
            title
            description
          }
        }
      `,
    })
    .then((result) => setPosts(result.data.allPosts));

  console.log(posts);

  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
