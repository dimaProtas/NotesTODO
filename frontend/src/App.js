import React from 'react';
//import ReactDOM from 'react-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
//import style from './index.css';
import './App.css';
import UserList from './components/Author.js';
import ProjectList from './components/Project1/Project.jsx';
import ProjectForm from './components/Project1/ProjectForm/ProjectForm.jsx';
import SearchProject from './components/Project1/SearchProject.jsx';
import TodoList from './components/Todo/item_todo.jsx';
import UserTodo from './components/UserTodo/UserTodo.jsx';
import LoginForm from './components/Auth/Auth.jsx';
import TodoForm from './components/Todo/TodoForm/TodoForm.jsx';
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
            'search': [],
        }
        this.is_authenticated = this.is_authenticated.bind(this)
        this.logout = this.logout.bind(this)
    }

    searchProject = (search) => {
    debugger;
    const headers = this.get_headers()
    axios.get("http://192.168.99.104:8000/api/project/?name=" + search, {headers})
        .then(response => {
        const search = response.data
                this.setState(
                {
                    'search': search.results
                }
            )
        }).catch(error => {console.log(error)})}

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://192.168.99.104:8000/api/todo/${id}`, {headers}).then(response => {
        this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
        }).catch(error => {console.log(error)})
        }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://192.168.99.104:8000/api/project/${id}/`, {headers}).then(response => {
        this.setState({items: this.state.items.filter((items) => items.id !== id)})
        }).catch(error => {console.log(error)})
        }

    createTodo(text, user, project, active) {
        const headers = this.get_headers()
        const data = {
    "text": text,
    "user": "http://192.168.99.104:8000/api/users/" + user + '/',
    "project": "http://192.168.99.104:8000/api/project/" + project + '/',
    "active": active,
        }
        axios.post('http://192.168.99.104:8000/api/todo/', data, {headers})
            .then(response => {
                let new_todo = response.data
//                const user = `http://127.0.0.1:8000/api/users/${new_todo.user}`
//                new_todo.user = user
//                const project = `http://127.0.0.1:8000/api/project/${new_todo.project}`
//                new_todo.project = project
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => {console.log(error)})
    }


    createProject(name, link, user) {
        const headers = this.get_headers()
        const data = {
    "name": name,
    "link": link,
    "users": ["http://192.168.99.104:8000/api/users/" + user + '/'],
        }
        axios.post('http://192.168.99.104:8000/api/project/', data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({items: [...this.state.items, new_project]})
            }).catch(error => {console.log(error)})
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
        axios.get('http://192.168.99.104:8000/api/project/', {headers})
            .then(response => {
                const items = response.data
                    this.setState(
                    {
                        'items': items.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://192.168.99.104:8000/api/1.0/users/', {headers})
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users.results
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://192.168.99.104:8000/api/todo/', {headers})
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
        axios.post('http://192.168.99.104:8000/api-token-auth/', {username: username, password: password})
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
                    <Route path='/projects' element={<ProjectList searchProject={(search) => this.searchProject} deleteProject={(id) => this.deleteProject(id)} key={this.state.items.id} items={this.state.items} />} />
                    <Route path='projects/create' element={<ProjectForm user={this.state.users} createProject={(name, link, user) => this.createProject(name, link, user)} />} />
                    <Route path='/todos' element={<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} />
                    <Route path='/todos/create' element={<TodoForm project={this.state.items} users={this.state.users} createTodo={
                    (text, user, project, active) => this.createTodo(text, user, project, active)} />} />
                    <Route path='/:id' element={<UserTodo items_user={this.state.todos} />} />
                    <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path='*' element={<NotFound404 />} />
                    <Route path="/users" element={<Navigate replace to="/" />} />
                    <Route path="/search" element={<SearchProject searchProject={(search) => this.searchProject(search)} search={this.state.search} />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App;

