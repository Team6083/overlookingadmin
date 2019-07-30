const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    name: String,
    username: String,
    email: String,
    displayName: String,
    birthday: String,
    phoneNumbers: PhoneNumbers,
    address: String,
    UID: ID!
  }

  type PhoneNumbers {
    home: String,
    mobile: String
  }

  type App {
    name: String,
    description: String,
    id: ID!
  }
  
  type Query {
    user(UID: ID): User,
    app(ID: ID): App,
    apps: [App]
  }

  input AddAppInput {
    name: String,
    description: String
  }

  type Mutation {
    addApp(app: AddAppInput): App
  }
  
`;

module.exports = typeDefs