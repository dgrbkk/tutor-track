import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT || 5000, (error) => {
  if (error) {
    return console.error(error.message);
  }

  console.info(`Server started on http://localhost:${PORT}`);
});
