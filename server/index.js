require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./dbConfig');
const models = require('./models/models');
const router = require('./router/index');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`server is started on port ${PORT}`)});
    } catch (error) {
        console.log(error)
    }
};

start();