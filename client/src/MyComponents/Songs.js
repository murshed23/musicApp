import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export const Songs = () => {

    const [songList, setSongList] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:3001/songs").then((response) => {
            setSongList(response.data);
        });
    }, []);

    return (
        <div className='container'>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                </tr>
            </thead>
            <tbody>
                {songList.map((val) => {
                    return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.name}</td>
                    </tr>
                })}
            </tbody>
            </table>
        </div>
    )
}
