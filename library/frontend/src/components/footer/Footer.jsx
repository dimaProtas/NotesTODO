import React from 'react';
import style from './Footer.module.css';

const NAvbar = () => {
    return (
    <header className={style.footer}>
        <div className='container'>
            <div className={style.box}>
                Платформа для заметок.
            </div>
        </div>
    </header>
    )
}

export default NAvbar