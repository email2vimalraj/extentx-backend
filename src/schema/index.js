const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Project {
        id: ID!
        name: String!
    }

    type Query {
        allProjects: [Project!]!
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
