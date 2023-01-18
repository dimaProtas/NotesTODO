import React from 'react';
import style from './item_todo.module.css';


const TodoItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.project.name}
            </td>
            <td>
                {item.user.username}
            </td>
            <td>
                {item.text}
            </td>
            <td>
                {item.created_at}
            </td>
            <td>
                {item.updated_at}
            </td>
            <td>
                {item.active}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <div className={style.box}>
            <table>
                <tr>
                    <th>Project Name</th>
                    <th>User</th>
                    <th>Text</th>
                    <th>Date</th>
                    <th>Update</th>
                    <th>Active</th>
                </tr>
                {todos.map((item) => <TodoItem item={item} />)}
            </table>
        </div>
    )
}

export default TodoList
