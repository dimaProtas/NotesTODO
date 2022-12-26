import React from 'react';
import style from './Footer.module.css';

const NAvbar = () => {
    return (
    <header className={style.footer}>
        <div className='container'>
            <div className={style.box}>
                <ul className={style.menu}>
                    <li>
                        <a href="##">Main</a>
                    </li>
                    <li>
                        <a href="##">Users</a>
                    </li>
                    <li>
                        <a href="##">Contacts</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    )
}

export default NAvbar