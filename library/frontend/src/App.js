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
import NotFound404 from './components/NotFound/NotFound.jsx';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';



class App extends React.Component {
    constructor(props) {
        super(props)
//            const user1 = {username: 'Dima', firstname: 'Грин', lastname: 'Valf', email: 'adfgf@mail.ru'}
//            const user2 = {username: 'Ira', firstname: 'Грин', lastname: 'Kolvb', email: 'adfgf@mail.ru'}
//            const users = [user1, user2]
//            const item1 = {users: user1, name: 'Алые паруса', link: 'author1'}
//            const item2 = {users: user2, name: 'Алые ', link: 'a'}
//            const item3 = {users: user2, name: 'паруса', link: 'bsd'}
//            const item4 = {users: user1, name: 'Что-то', link: '4etry'}
//            const items = [item1, item2, item3, item4]
        this.state = {
            'users': [],
            'items': [],
        }
    }


    componentDidMount() {
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



    render () {
        return (
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<UserList users={this.state.users} />} />
                    <Route path='/projects' element={<ProjectList items={this.state.items} />} />
                    <Route path='/todos' element={<TodoList todos={this.state.todos} />} />
                    <Route path='/main' element={<Main />} />
                    <Route path='*' element={<NotFound404 />} />
                    <Route path="/users" element={<Navigate replace to="/" />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

export default App;

