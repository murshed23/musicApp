import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export const Artists = () => {
    const [artistList, setArtistList] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:3001/artists").then((response) => {
            setArtistList(response.data);
        });
    }, []);

    return (
        <div className='container m-5'>
            <h3>Top 10 Artists</h3>
            <table className="table table-borderless">
            <thead className='table-light'>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                </tr>
            </thead>
            <tbody>
                {artistList.map((val) => {
                    return <tr key={val.id}>
                        <th scope="row">{val.name}</th>
                        <td >{val.DOB}</td>
                    </tr>
                })}
            </tbody>
            </table>
        </div>
    )
}
