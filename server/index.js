import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';

const port = process.env.PORT | 5033;
const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const startServer = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DBURI);
    console.log('MongoDB is connected successfully');
    app.listen(port, (err) => {
      if (err) console.warn(err);
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.warn('Server Error: ', err.message);
    process.exit(1);
  }

  app.use('/api/auth', authRouter);
};

startServer();
