const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database")

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});


const taskRoutes = require('./routes/task'); // Import the route file

// Routes
app.use('/api', taskRoutes); // Prefix all task routes with '/api'