const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'spotify-like'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/songs", (req, res) => {
  const slctSong = "SELECT * FROM songs";
  db.query(slctSong, (err, result) => {
    res.send(result);
  });
});

app.post("/addSong", (req, res) => {

  const songName = req.body.songName

  const query = "INSERT INTO songs (name) VALUES (?)";
  db.query(query, [songName], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
    console.log("Runnin... ");
});