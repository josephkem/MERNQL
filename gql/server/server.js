const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

//express server
const app = express();

//database
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log("db connection error", error);
  }
};

//excecute db connection
db();

//typeDefs and resolvers
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

//graphql server
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

//server
const httpserver = http.createServer(app);

app.get("/rest", (req, res) => {
  res.json({
    data: "This is the rest endpoint",
  });
});

//port
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  console.log(
    `graphql server is running on port ${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
