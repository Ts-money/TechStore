const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const PORT_APOLLO = 5000;
const app = express();

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// WIP (Owais)

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starts Express Web Server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Apollo Server Constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

// Connects to MongoDB and then starts Apollo Server
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/techstore", { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT_APOLLO });
  })
  .then((res) => {
    console.log(`Mongoose Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })