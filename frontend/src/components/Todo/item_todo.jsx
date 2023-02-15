import React from 'react';
import style from './item_todo.module.css';
import {Link} from 'react-router-dom'


const TodoItem = ({item, deleteTodo}) => {
    if(item.active){
        return (
            <tr>
                <td>
                    {item.project.name}
                </td>
                <td>
                    <Link to={`/${item.user.id}`}>{item.user.username}</Link>
                </td>
                <td>
                    {item.text.slice(0.20)}
                </td>
                <td>
                    {item.created_at.slice(0,10)}
                </td>
                <td>
                    {item.updated_at.slice(11, 16)} {item.updated_at.slice(0,10)}
                </td>
                <td>
                    {item.active ? 'Yes' : 'No'}
                </td>
                <td className={style.del}>
                    <button type='button' onClick={() => deleteTodo(item.id)}>Delete</button>
                </td>
            </tr>
        )
    }
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
        <div className={style.box}>
            <table>
                <tr>
                    <th>Project Name</th>
                    <th>User</th>
                    <th>Text</th>
                    <th>Date</th>
                    <th>Update</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                {todos.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
            </table>
        </div>
        <Link className={style.create} to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList
