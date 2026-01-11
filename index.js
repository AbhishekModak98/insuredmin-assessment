const express = require('express');
const mongoose = require('mongoose');
const app = express();
const uploadRoutes = require('./src/routes/upload.routes');
const policyRoutes = require('./src/routes/policy.routes');

mongoose
    .connect('mongodb+srv://abhishekrameshwarmodak_db_user:54Tr80SiAnKftdXi@assessment.1brbcwm.mongodb.net/?appName=assessment')
    .then(() => console.log('connected to mongodb'))
    .catch(error => console.log('error while connecting to db: ', error));

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', policyRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
