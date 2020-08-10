const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

require("dotenv").config({ path: "./variables.env" });

const app = express();

app.use(
  cors({
    origin: "http://localhost/3000",
    credentials: true,
  })
);

const Recipe = require("./Models/Recipe.js");
const User = require("./Models/User");

const { ApolloServer, gql } = require("apollo-server-express");

//*Apollo Schema and resolver
const typeDefs = gql(
  fs.readFileSync("./graphql/schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

//!connect to Database
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("CONECTED TO DB"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT | 4000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
