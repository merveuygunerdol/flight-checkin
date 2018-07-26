const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

require('./database-connection');
app.use(cors());
app.use(bodyparser.json());

const user = require('./routes/user');

app.use('/user', user);

app.listen(3030, () => {
    console.log('Server Listening');
});
