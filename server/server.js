const express = require("express");
const routes = require("./network/routes");
const db = require("./components/db");
const cors = require("cors");

var app = express();

const SERVER_PORT = process.env.port || 8080;
// const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const DB_PORT = "";
const DB_USER = "learning_rjmata";
const DB_PASSWORD = "learningBoy";
const DB_HOST = "cluster0.knwqk.mongodb.net";
const DB_NAME = "mayo_project";

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;

// const MONGO_URI = `mongodb+srv://learning_rjmata:learningBoy@cluster0.knwqk.mongodb.net:27017/mayo_project?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("app"));
app.use(cors());

routes(app);
db(MONGO_URI);

// db.set('useFindAndModify', false)

app.listen(SERVER_PORT, () => {
  console.log("Listening on port: " + SERVER_PORT);
});
