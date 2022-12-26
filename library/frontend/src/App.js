import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import style from './index.css';
import './App.css';
import UserList from './components/Author.js';
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }


    render () {
        return (
            <div>
                <Navbar />
                <UserList users={this.state.users} />
                <Footer />
            </div>
        )
    }
}

export default App;

