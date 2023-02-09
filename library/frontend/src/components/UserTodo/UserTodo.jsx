import React from 'react';
import style from './UserTodo.module.css';
import { useParams } from 'react-router-dom'


const UserItem = ({item}) => {
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
                {item.created_at.slice(0,10)}
            </td>
            <td>
                {item.updated_at.slice(11, 16)} {item.updated_at.slice(0,10)}
            </td>
            <td>
                {item.active ? 'Yes' : 'No'}
            </td>
        </tr>
    )
}

const UserTodo = ({items_user}) => {
    let { id } = useParams();
    let filtered_items = items_user.filter((item) => item.user.id == id)
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
                {filtered_items.map((item) => <UserItem item={item} />)}
            </table>
        </div>
    )
}

export default UserTodo
