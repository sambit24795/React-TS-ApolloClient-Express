import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession, { RefetchProp } from "./components/Hoc/withSession";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import AddRecipe from "./components/Recipe/SingleRecipe/AddRecipe";
import SingleRecipe from "./components/Recipe/SingleRecipe/SingleRecipe";

const httpLink: HttpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authMiddleware: ApolloLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return forward(operation);
});

/* const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
}); */

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: from([authMiddleware, httpLink]),
});

interface Props extends RefetchProp {}

const Root: React.FC<Props> = ({ refetch, userData, client }): JSX.Element => (
  <BrowserRouter>
    <Navbar refetch={refetch} userData={userData} client={client} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" exact render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" exact render={() => <Signup refetch={refetch} />} />
      <Route path="/search" exact render={() => <Search refetch={refetch} />} />
      <Route path="/recipe/add" exact render={() => <AddRecipe />} />
      <Route path="/recipe/:_id" exact render={() => <SingleRecipe />} />
      <Redirect to="/" />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

const RootWithSession: React.ReactType = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
