const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

require('./database-connection.js')

app.use(cors());
app.use(bodyparser.json());

const flight = require('./routes/flight.js');

app.use('/', flight)

app.get('/', (req, res, next) => {
    res.send('hello')
})

app.get('/seat-plan', (req, res, next) => {
    res.send('hello')
})

app.listen(3000, () => {
console.log('merve rocks bu proje bitecek')
})

