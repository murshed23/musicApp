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
    }catch(err) {
      res.send(400);
    }
  });

app.get("/songs", (req, res) => {
  const slctSong = "SELECT * FROM songs";
  db.query(slctSong, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
    console.log("Runnin... ");
});