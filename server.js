const express = require('express');

const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// setup JWT Authentication middleware
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if(token !== "null"){
        try{
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch(err){
            console.error(err);
        }
    }
    next();
});
// Create Graphiql Application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

// Connect Schemas with Graphql
app.use('/graphql', bodyParse.json(), graphqlExpress(({currentUser})=>({
    schema,
    context: {
        User,
        Recipe,
        currentUser
    }
})))
const PORT = process.env.PORT || 4444;

app.listen(PORT, () =>{
    console.log(`Server Listening on PORT ${PORT}`);
})