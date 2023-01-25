import React from 'react';
import style from './Auth.module.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''};
    }

    handleChange(event) {
        this.setState(
        {[event.target.name]: event.target.value}
        )
    }

    hendleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault(); // отмена отправки формы
    }

    render() {
        return (
            <form onSubmit={(event) => this.hendleSubmit(event)}>
                <input type='text' name='login' placeholder='login' value={this.state.login}
                        onChange={ (event) => this.handleChange(event) } />
                <input type='password' name='password' placeholder='password' value={this.state.password}
                        onChange={ (event) => this.handleChange(event) } />
                <input type='submit' value='Login' />
            </form>
        )
    }
}

export default LoginForm