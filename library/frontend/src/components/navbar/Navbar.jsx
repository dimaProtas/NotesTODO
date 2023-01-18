import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom'

const NAvbar = () => {
    return (
    <header className={style.header}>
        <div className='container'>
            <div className={style.box}>
                <ul className={style.menu}>
                    <li>
                        <NavLink to="##">Main</NavLink>
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
                </ul>
            </div>
        </div>
    </header>
    )
}

export default NAvbar
