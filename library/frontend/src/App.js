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



class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'users': [],
            'items': [],
        }
    }

    load_date() {
                axios.get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const items = response.data
                    this.setState(
                    {
                        'items': items.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data
                    this.setState(
                    {
                        'todos': todos.results
                    }
                )
            }).catch(error => console.log(error))

    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
        console.log(response.data)
    }).catch(error => alert('Неверный логин или пароль'))
}


    componentDidMount() {
        this.load_date()
        this.get_token()
    }



    render () {
        return (
            <BrowserRouter>
                <Navbar />
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

