const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

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

// Routes