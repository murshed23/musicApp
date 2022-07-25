import React, { useState } from 'react'
import Axios from 'axios'

export const AddArtist = () => {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const submitArtist = () => {
    Axios.post('http://localhost:3001/addArtist', {
        artistName: name,
        dob: dob
    }).then(res => 
      console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className='container m-5'>
        <h3>Add a new Artist</h3>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Artist Name</label>
            <input type="text" className="form-control" id="name" placeholder="Artist Name" onChange={(e) => {
              setName(e.target.value)
            }}/>
            <label htmlFor="dateob" className="form-label">Artist DOB</label>
            <input type="text" className="form-control" id="dateob" placeholder="Artist DOB" onChange={(e) => {
              setDob(e.target.value)
            }}/>
        </div>
        <button type="button" class="btn btn-light" onClick={submitArtist}>Submit</button>
    </div>
  )
}
