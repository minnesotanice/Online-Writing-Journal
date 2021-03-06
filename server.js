// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");


// need cookieParser middleware before we can do anything with cookies


// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
// updated 6-30-18 by steph
// static route needs to be set up to work in all server environments
// app.use(express.static("public"));
app.use('/public', express.static(path.join(__dirname, "public")));
// app.use('/static', express.static(path.join(__dirname, 'public')))


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(cookieParser());
// Routes
// =============================================================


require("./routes/user-routes.js")(app, db);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
