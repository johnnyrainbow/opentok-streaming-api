require("dotenv").config()
const bodyParser = require('body-parser');
const OpenTok = require('opentok')
const express = require('express');
const cors = require('cors');

import { handleError } from "./lib/middleware/errorHandling"
import * as openTokPromises from "./opentok/promises"

//pass opentok dependency
const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);
openTokPromises.dependencies.opentok = opentok

const app = express();
app.use(cors());
app.options('*', cors());
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//require routes
require('./routes/broadcastRoutes')(app);
require('./routes/tutorRoutes')(app);
require('./routes/roomRoutes')(app);
require('./routes/standardUserRoutes')(app);
//error handling layer, mainly for sql errors
app.use(handleError)

app.listen(port, () => console.log(`API listening on port ${port}`));
