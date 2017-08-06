const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Project {
        id: ID!
        name: String!
        reports: [Report!]!
    }

    type Report {
        id: ID!
        name: String!
        startTime: String!
        endTime: String!
        duration: Int!
        parentLength: Int!
        passParentLength: Int!
        failParentLength: Int!
        fatalParentLength: Int!
        errorParentLength: Int!
        warningParentLength: Int!
        skipParentLength: Int!
        exceptionsParentLength: Int!
        childLength: Int!
        passChildLength: Int!
        failChildLength: Int!
        fatalChildLength: Int!
        errorChildLength: Int!
        warningChildLength: Int!
        skipChildLength: Int!
        infoChildLength: Int!
        exceptionsChildLength: Int!
        grandChildLength: Int!
        passGrandChildLength: Int!
        failGrandChildLength: Int!
        fatalGrandChildLength: Int!
        errorGrandChildLength: Int!
        warningGrandChildLength: Int!
        skipGrandChildLength: Int!
        exceptionsGrandChildLength: Int!
        project: Project!
    }

    type Query {
        allProjects: [Project!]!
        allReports: [Report!]!
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
