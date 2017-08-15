const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Project {
        id: ID!
        name: String!
        reports: [Report!]!
        tests: [Test!]!
    }

    type Report {
        id: ID!
        name: String!
        startTime: String!
        endTime: String!
        duration: Int!
        parentLength: Int!
        passParentLength: Int
        failParentLength: Int
        fatalParentLength: Int
        errorParentLength: Int
        warningParentLength: Int
        skipParentLength: Int
        exceptionsParentLength: Int
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
        tests: [Test!]!
    }

    type Test {
        id: ID!
        name: String!
        description: String!
        status: String!
        level: Int!
        startTime: String!
        endTime: String!
        childNodesCount: Int!
        bdd: Boolean!
        childNodesLength: Int!
        duration: Int!
        categorized: Boolean!
        parent: Test!
        parentName: String!
        project: Project!
        report: Report!
        exception: Exception
    }

    type Exception {
        id: ID!
        name: String!
        stacktrace: String!
        testCount: Int!
        project: Project!
        report: Report!
    }

    type Query {
        project(filter: ProjectFilter): [Project!]!
        allReports(filter: ReportFilter): [Report!]!
        allTests: [Test!]!
    }

    input ProjectFilter {
        id: ID
        name: String
    }

    input ReportFilter {
        id: ID
        name: String
        project: String
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
