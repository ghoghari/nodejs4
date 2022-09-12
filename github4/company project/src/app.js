var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('dotenv').config();
var port = process.env.PORT || 4500;

const cors = require('cors');
app.use(cors({
    origin: " http://localhost:3000"
}))

const router = require('./routers');
app.use('/', router);

app.use(express.static("public"));

var ejs = require("ejs");
var path = require("path");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

app.listen(port , ()=>{
    console.log("Okay");
})