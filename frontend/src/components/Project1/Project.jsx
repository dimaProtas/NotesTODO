import React from 'react';
import style from './Project.module.css';
import {Link} from 'react-router-dom';

const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>
                {item.users.map((u) => u.username + `,`)}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.link}
            </td>
            <td className={style.del}>
                <button type='button' onClick={() => deleteProject(item.id)}>delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
            <div className={style.box}>
                <table>
                    <tr>
                        <th>Users</th>
                        <th>Name project</th>
                        <th>Link project</th>
                    </tr>
                    {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
                </table>
            </div>
            <Link className={style.create} to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList
