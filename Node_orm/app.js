const express = require("express");

const bodyParser = require('body-parser');
const router = require('./routes')
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use('/',router);





app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
