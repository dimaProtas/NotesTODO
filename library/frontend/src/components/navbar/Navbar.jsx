import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({auth, logout}) => {
    return (
    <header className={style.header}>
        <div className='container'>
            <div className={style.box}>
                <ul className={style.menu}>
                    <li>
                        <NavLink to="/main">Main</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/todos">Todos</NavLink>
                    </li>
                    <div  className={style.logout}>
                        <li>
                            {auth()  ? <button onClick={()=> logout()}>Logout</button> : <NavLink to="/login">Login</NavLink>}
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    </header>
    )
}

export default Navbar
