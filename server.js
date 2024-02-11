import mongoose from 'mongoose';
import app from './app.js';

// HANDLE UNCAUGHT EXCEPTION
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! ⛄️ Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 3000;

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

// HANDLE UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! ⛄️ Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
