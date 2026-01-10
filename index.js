const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose
    .connect('mongodb+srv://abhishekrameshwarmodak_db_user:54Tr80SiAnKftdXi@assessment.1brbcwm.mongodb.net/?appName=assessment')
    .then(() => console.log('connected to mongodb'))
    .catch(error => console.log('error while connecting to db: ', error));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
