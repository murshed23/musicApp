import React, { useState } from 'react'
import Axios from 'axios'

export const AddSongs = () => {

  const [name, setName] = useState("");

  const submitSong = () => {
    Axios.post('http://localhost:3001/addSong', {
      songName: name,
    }).then(() => {
      alert("Inserted");
    });
  };

  return (
    <div className='container'>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Song Name</label>
            <input type="text" className="form-control" id="name" placeholder="Song Name" onChange={(e) => {
              setName(e.target.value)
            }}/>
        </div>
        <button onClick={submitSong}>Submit</button>
    </div>
  )
}
