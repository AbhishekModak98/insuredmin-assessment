const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

// db details:
// username: abhishekrameshwarmodak_db_user
// password: 54Tr80SiAnKftdXi
// connection string: mongodb+srv://abhishekrameshwarmodak_db_user:54Tr80SiAnKftdXi@assessment.1brbcwm.mongodb.net/?appName=assessment
