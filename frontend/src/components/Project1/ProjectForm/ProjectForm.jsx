import React from 'react';
import {Link} from 'react-router';
import style from '../Project.module.css';


class ProjectCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', link: '', user: this.props.user[0]?.id}
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
        this.props.createProject(this.state.name, this.state.link, this.state.user)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <input type="text" placeholder='text' className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder='link' className="form-control" name="link"
                    value={this.state.link} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <select type="number" placeholder='user' className="form-control" name="user"
                    value={this.state.user} onChange={(event)=>this.handleChange(event)}>
                        {this.props.user.map((u) => <option value={u.id} >{u.username}</option>)}
                    </select>

                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectCreate;