import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import {ADD_RECIPE, GET_ALL_RECIPES} from '../../queries';

const initialState = {
    name: "",
    description: "",
    category: "Breakfast",
    instructions: "",
    username: ""
}
class AddRecipe extends React.Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }
    componentDidMount(){
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }
    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({data}) => {
            console.log(data);
            this.clearState();
            this.props.history.push("/");
        })
    }
    validateForm = () => {
        const { name, description, instructions, category } = this.state;
        const isInvalid = !name || !description || !instructions || !category;
        return isInvalid;
    }
    updateCache = (cache, {data: {addRecipe}}) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES});
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })
    }
    render() {
        const { name, description, instructions, category,username } = this.state;
        return(

        <Mutation 
            mutation={ADD_RECIPE} 
            variables={{ name, description, instructions, category,username }}
            update={this.updateCache}>
            {(addRecipe, {data, loading, error}) => {

                return (
                    <div className="App">
                        <h2 className="App">Add Recipe</h2>
                        <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                            <input type="text" value={name} onChange={this.handleChange} placeholder="Recipe name" name="name" />
                            <select name="category" onChange={this.handleChange} value={category}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input type="text" value={description} onChange={this.handleChange} placeholder="Add description" name="description" />
                            <textarea value={instructions} onChange={this.handleChange} placeholder="Add instructions" name="instructions"></textarea>
                            <button disabled={loading || this.validateForm()} type="submit" className="button-primary">Submit</button>
                            {error && <Error error={error} />}
                        </form>
                    </div>
                );
            }}
        </Mutation>
        )
    }
};

export default withRouter(AddRecipe);