import React, { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Axios from 'axios'

export const AddSongs = () => {

  // const handleOpChange = (e) => {
  //   var options = e.target.options;
  //   var value = [];
  //   for (var i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   this.props.someCallback(value);
  // }

  const [artList, setArtList] = useState([]);

  const [selected, setSelected] = useState([]);
    

  useEffect(() => {
    Axios.get("http://localhost:3001/artistsNm").then((response) => {
      setArtList(response.data);
    });
  }, []);

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
    formdata.append('artist', selected);
    formdata.append('songName', name);

    Axios.post('http://localhost:3001/addSong', formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => 
      console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className='container m-5'>
      <form action="http://localhost:3001/addSong" method='POST'>
        <h3>Adding a new Song</h3>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Song Name</label>
            <input type="text" className="form-control" id="name" placeholder="Song Name" onChange={(e) => {
              setName(e.target.value)
            }}/>
        </div>
        <div>
        <MultiSelect
          options={artList}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
        </div>
        <label className="form-label">Select Image :</label>
        <input type="file" className="form-control mb-3" name="upload_file"  onChange={handleInputChange} />
        <button type="button" class="btn btn-light" onClick={submitSong}>Submit</button>
        </form>
    </div>
  )
}