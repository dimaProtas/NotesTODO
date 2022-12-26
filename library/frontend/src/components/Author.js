import React from 'react';
import style from './Authors.module.css';

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div className={style.box}>
            <table>
                <th>
                    Login
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    email
                </th>
                {users.map((user) => <UserItem user={user} />)}
            </table>
        </div>
    )
}


export default UserList
