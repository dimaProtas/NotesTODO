import React from 'react';
//import ReactDOM from 'react-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
//import style from './index.css';
import './App.css';
import UserList from './components/Author.js';
import ProjectList from './components/Project1/Project.jsx';
import TodoList from './components/Todo/item_todo.jsx';
import Main from './components/Main/Main.jsx';
import UserTodo from './components/UserTodo/UserTodo.jsx';
import LoginForm from './components/Auth/Auth.jsx';
import NotFound404 from './components/NotFound/NotFound.jsx';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'users': [],
            'items': [],
            'token': '',
        }
        this.is_authenticated = this.is_authenticated.bind(this)
        this.logout = this.logout.bind(this)
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_date())
    }

    is_authenticated() {
        return this.state.token != ''
    }


    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_date())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
}



    load_date() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/project/', {headers})
            .then(response => {
                const items = response.data
                    this.setState(
                    {
                        'items': items.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data
                    this.setState(
                    {
                        'todos': todos.results
                    }
                )
            }).catch(error => console.log(error))
            this.setState({todos: []})
    }

    get_token(username, password) {
        debugger;
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }



    render () {
        return (
            <BrowserRouter>
                <Navbar auth={this.is_authenticated} logout={this.logout} userName={this.userName} />
                <Routes>
                    <Route path='/' element={<UserList users={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList items={this.state.items} />} />
                    <Route path='/todos' element={<TodoList todos={this.state.todos} />} />
                    <Route path='/main' element={<Main />} />
                    <Route path='/:id' element={<UserTodo items_user={this.state.todos} />} />
                    <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path='*' element={<NotFound404 />} />
                    <Route path="/users" element={<Navigate replace to="/" />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App;

