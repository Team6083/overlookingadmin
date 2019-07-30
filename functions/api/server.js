const express = require("express");
const { ApolloServer } = require("apollo-server-express");

module.exports = (admin) => {
    const typeDefs = require('./schema');
    const resolvers = require('./resolvers')(admin);

    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app, path: "/", cors: true });

    return app;
};