const express = require('express');

const mongoose = require('mongoose');
const bodyParse = require('body-parser');

require('dotenv').config({ path: 'variables.env'});
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolver');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Connects to Database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.error(err));

// Initializes the Application
const app = express();

// Create Graphiql Application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

// Connect Schemas with Graphql
app.use('/graphql', bodyParse.json(), graphqlExpress({
    schema,
    context: {
        User,
        Recipe
    }
}))
const PORT = process.env.PORT || 4444;

app.listen(PORT, () =>{
    console.log(`Server Listening on PORT ${PORT}`);
})