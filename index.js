const app = require('./routes/routes');
const dotenv = require('dotenv');

// Load .env
dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
