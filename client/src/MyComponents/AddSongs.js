import React, { useState } from 'react'
import Axios from 'axios'

export const AddSongs = () => {

  const [name, setName] = useState("");

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
  }

  const submitSong = () => {
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);
    formdata.append('songName', name);

    Axios.post('http://localhost:3001/addSong', formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => 
      console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className='container'>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Song Name</label>
            <input type="text" className="form-control" id="name" placeholder="Song Name" onChange={(e) => {
              setName(e.target.value)
            }}/>
        </div>
        <label className="text-white">Select Image :</label>
        <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
        <button onClick={submitSong}>Submit</button>
    </div>
  )
}
