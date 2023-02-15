import React from 'react';
import {Link} from 'react-router';
import style from '../Project.module.css';


class SearchForm extends React.Component {
    debugger;
    constructor(props) {
        super(props)
        this.state = {search: ''}
    }
    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.searchProject(this.state.search)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <input type="text" placeholder='name project' className="form-control" name="search"
                    value={this.state.search} onChange={(event)=>this.handleChange(event)} />
                </div>

                <input type="submit" className="btn btn-primary" value="Search" />
{/*                 <button onClick={this.props.searchProject(this.state.search)}>Search</button> */}
            </form>
        );
    }
}

export default SearchForm;