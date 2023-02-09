import React from 'react';
import {Link} from 'react-router-dom';
import style from './Project.module.css';
import SearchForm from './SearchForm/SearchForm.jsx';

const ProjectItem = ({item}) => {
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
            </td>
        </tr>
    )
}

const SearchProject = ({search, searchProject}) => {
    return (
        <div>
        <SearchForm searchProject={searchProject} />
            <div className={style.box}>
                <table>
                    <tr>
                        <th>Users</th>
                        <th>Name project</th>
                        <th>Link project</th>
                    </tr>
                    {search.map((item) => <ProjectItem item={item} />)}
                </table>
            </div>
        </div>
    )
}


export default SearchProject
