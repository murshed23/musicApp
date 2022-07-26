const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path');
const mysql = require('mysql');
const multer = require('multer')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'spotify-like'
});

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

var upload = multer({dest:'../client/src/uploads/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/src/uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })

app.post('/addSong', upload.single('avatar'), (req, res, error) => {
    try {
      const query = "INSERT INTO songs (name, artwork) VALUES ('"+req.body.songName+"','"+req.file.filename+"')";
      db.query(query, (err, result) => {
        console.log(result);
      });
      const query2 = "INSERT INTO songartist (songId, artist) VALUES (1,'"+req.file.artist[0]['"value"']+"')";
      db.query(query2, (err2, result2) => {
        console.log(result2);
      });
    }catch(err) {
      res.send(400);
    }
  });

  app.post('/addArtist', (req, res, error) => {
    try {
      const query = "INSERT INTO artists (name, DOB) VALUES ('"+req.body.artistName+"','"+req.body.dob+"')";
      db.query(query, (err, result) => {
        console.log(result);
      });
    }catch(err) {
      res.send(400);
    }
  });

app.get("/songs", (req, res) => {
  const slctSong = "SELECT * FROM songs JOIN (SELECT id, AVG(rate) avg FROM ratings GROUP BY id) rte ON songs.id=rte.id";
  db.query(slctSong, (err, result) => {
    res.send(result);
  });
});

app.get("/artists", (req, res) => {
  const slctArtist = "SELECT * FROM artists";
  db.query(slctArtist, (err, result) => {
    res.send(result);
  });
});

app.get("/artistsNm", (req, res) => {
  const slctArtistNm = "SELECT name label, id value FROM artists";
  db.query(slctArtistNm, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
    console.log("Runnin... ");
});