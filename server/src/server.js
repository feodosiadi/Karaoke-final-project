require('dotenv').config();

const app = require('./app');
const PORT = process.env || 3000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
