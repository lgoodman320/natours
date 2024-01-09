import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 3000;

// START SERVER
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
