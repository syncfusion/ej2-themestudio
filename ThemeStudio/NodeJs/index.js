var express = require("express");
const cors = require("cors"); 

var app = express();
app.use(cors());

const parser = express.json();
app.use(parser);
app.use(express.urlencoded({
    extended: true
}));

require("./routes/scss-compiler.js")(app);

var port = process.env.PORT || 1660;

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});