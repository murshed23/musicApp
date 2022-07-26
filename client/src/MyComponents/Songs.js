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
        <div className='container m-5'>
            <h3>Top 10 Songs</h3>
            <table className="table table-borderless">
            <thead className='table-light'>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Artwork</th>
                <th scope='col'>Rating</th>
                </tr>
            </thead>
            <tbody>
                {songList.map((val) => {
                    return <tr key={val.id}>
                        <th scope="row">{val.name}</th>
                        <td ><img className="rounded" width="100px" src={require("../uploads/"+val.artwork)} alt="" /></td>
                        <td>{val.avg}</td>
                    </tr>
                })}
            </tbody>
            </table>
        </div>
    )
}
