const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

//NEED MULTER AND CORS AND JOI STUFF

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://lukepalassis:IyaykwOUKzH07dW2@mongodbtest.feccrav.mongodb.net/"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const albumSchema = new mongoose.Schema({
  name: String,
  band: String,
  date: String,
  genre: String,
  members: [String],
  description: String,
  link: String,
  songs: [String],
  img: String,
});

const Music = mongoose.model("Music", albumSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/api/music", (req, res) => {
  getAlbums(res);
});

const getAlbums = async (res) => {
  const albums = await Music.find();
  res.send(albums);
};

app.get("/api/music/:id", async (req, res) => {
  getMusic(req.params.id, res);
});

const getAlbum = async (id, res) => {
  const album = await Music.findOne({ _id: id });

  album.date = new Date(album.date);
  console.log(album);
  res.send(album);
};

app.post("/api/music/", upload.single("img"), async (req, res) => {
  const result = validateAlbum(req.body);
  console.log(result);
  if (result.error) {
    // If validation fails, send a JSON response with the error message
    res.status(400).json({ error: result.error.details[0].message });
    return;
  }

  const imageFilename = req.file ? req.file.filename : null;
  console.log(imageFilename);
  const album = new Music({
    name: req.body.name,
    band: req.body.band,
    date: req.body.date,
    description: req.body.description,
    genre: req.body.genre,
    link: req.body.link,
    songs: req.body.songs.split(","),
    members: req.body.members.split(","),
    img: imageFilename, // Set imageFilename or null based on whether a file was uploaded
  });
  console.log(album.img);

  createAlbum(album, res);
});

const createAlbum = async (albumData, res) => {
  const album = new Music(albumData);
  try {
    const result = await album.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

app.put("/api/music/:id", upload.single("img"), async (req, res) => {
  console.log("ID FOR ALBUM    " + req.params.id);
  const album = await Music.findById(req.params.id);

  if (!album) {
    res.send(404).send("That specific album is not in the database");
  }

  let fieldsToUpdate = {
    name: req.body.name,
    band: req.body.band,
    date: req.body.date,
    genre: req.body.genre,
    description: req.body.description,
    link: req.body.link,
    songs: req.body.songs.split(","),
    members: req.body.members.split(","),
  };

  if (req.file) {
    fieldsToUpdate.img = req.file.filename;
  }

  const updateResult = await Music.updateOne(
    { _id: req.params.id },
    fieldsToUpdate
  );

  res.send(updateResult);
});

app.delete("/api/music/:id", async (req, res) => {
  const album = await Music.findByIdAndDelete(req.params.id);
  res.send(album);
});

const validateAlbum = (album) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    link: Joi.allow(""),
    songs: Joi.allow(""),
    members: Joi.allow(""),
    genre: Joi.allow(""),
    band: Joi.allow(""),
    date: Joi.allow(""),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(album);
};

app.listen(3005, () => {
  console.log(`listening`);
});
