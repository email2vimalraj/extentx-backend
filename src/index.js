const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const schema = require('./schema');
const connectMongo = require('./mongo-connector');

const start = async () => {
    const PORT = 3001;
    const mongo = await connectMongo();
    let app = express();

    const buildOptions = async (req, res) => {
        return {
            context: {
                mongo
            },
            schema,
        };
    };
    
    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
    }));

    const server = createServer(app);
    server.listen(PORT, () => {
        SubscriptionServer.create(
            {execute, subscribe, schema},
            {server, path: '/subscriptions'}
        );
        console.log(`Running on http://localhost:${PORT}`);
    });
};

start();
