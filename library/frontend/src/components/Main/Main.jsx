import React from 'react';
import style from './Main.module.css';


const Main = () => {
    return (
        <div className={style.box}>
            <h1 className={style.header}>Создать заметку</h1>
            <form>
                <input placeholder="Name project"></input>
                <input placeholder="link project"></input>
                <input placeholder="Users project"></input>
                <textarea placeholder="Name project"></textarea>
                <button type="button">Add</button>
            </form>
        </div>
    )
}

export default Main
