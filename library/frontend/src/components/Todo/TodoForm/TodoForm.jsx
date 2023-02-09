import React from 'react';
import style from '../item_todo.module.css';

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', user: this.props.users[0].id, project: this.props.project[0].id, active: true}
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
        this.props.createTodo(this.state.text, this.state.user, this.state.project,
        this.state.active)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <input type="text" placeholder='text' className="form-control" name="text"
                    value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <select type="number" placeholder='user' className="form-control" name="user"
                    value={this.state.user} onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((u) => <option value={u.id}>{u.username}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <select type="number" placeholder='project' className="form-control" name="project"
                    value={this.state.project} onChange={(event)=>this.handleChange(event)}>
                        {this.props.project.map((p) => <option value={p.id}>{p.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <select type="text" placeholder='active' className="form-control" name="active"
                    value={this.state.active} onChange={(event)=>this.handleChange(event)}>
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default TodoForm

