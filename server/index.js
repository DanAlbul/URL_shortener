import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';

const port = process.env.PORT || 5005;
const app = express();

const startServer = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DBURI);
    console.log('MongoDB is connected successfully');
    app.listen(port, () => {
      console.log(`Server is running at https://localhost:${port}`);
    });
  } catch (err) {
    console.log('Server Error: ', err.message);
    process.exit(1);
  }

  app.use('api/auth', authRouter);
};

startServer();
