const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// import api routes
const items = require('./routes/api/items');

// initialize express
const app = express()

//Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURL;

// connect to mongo using a promise
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder to the client/build folder
    app.use(express.static('client/build'));

    // let all requests not an api call, point to index.html file in the client/build folder
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));