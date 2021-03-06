import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const handleSignOut = (client, history) => {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push('/');
};
const Signout = ({history}) => (
    <ApolloConsumer>
        { client => {
            console.log(client);
            return (
                <button onClick={() => handleSignOut(client, history)}>SignOut</button>
            )
        }}
    </ApolloConsumer>
);

export default withRouter(Signout);