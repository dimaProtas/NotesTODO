import React from 'react';
import style from './Project.module.css';

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.users + `,`}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.link}
            </td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    return (
        <div className={style.box}>
            <table>
                <tr>
                    <th>Users</th>
                    <th>Name project</th>
                    <th>Link project</th>
                </tr>
                {items.map((item) => <ProjectItem item={item} />)}
            </table>
        </div>
    )
}


export default ProjectList
