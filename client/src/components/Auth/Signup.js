import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNUP_USER } from '../../queries/index';
import Error from '../Error';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

class Signup extends React.Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(async ({data}) => {
            console.log(data);
            localStorage.setItem('token', data.signupUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');

        });
        
    }
    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;
        const isInValid = !username || !email || !password || password !== passwordConfirmation;
        return isInValid;
    }
    render() {
        const { email, username, password, passwordConfirmation} = this.state;
        return (
             <div className="App">
                 <h2 className="App">Signup</h2>
                 <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
                    {(signupUser, {data, loading, error}) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
                                <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
                                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                                <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} placeholder="Confirm Password" />
                                <button 
                                    type="submit"
                                    disabled={loading || this.validateForm()}
                                    className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }
                    }
                 </Mutation>
             </div>
        )
    }
}

export default withRouter(Signup);