import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index';

class Signup extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(data => {
            console.log(data);
        })
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
                                <button type="submit" className="button-primary">Submit</button>
                            </form>
                        )
                    }
                    }
                 </Mutation>
             </div>
        )
    }
}

export default Signup;