const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//db config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

//set public folser 
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable CORS
app.use(cors());

app.use('/poll', poll);

const port = 8088;

//start the server
app.listen(port, () => console.log(`Server started on port ${port}`));

