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

const httpLink: HttpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authMiddleware: ApolloLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null,
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

const Root: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={App} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
