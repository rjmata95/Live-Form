const express = require("express");
const routes = require("./network/routes");
const db = require("./components/db");
const cors = require("cors");
require("dotenv").config();
var app = express();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, SERVER_PORT } =
  process.env;
const PORT = SERVER_PORT || 5000;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("app"));
app.use(cors());

routes(app);
db(MONGO_URI);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
