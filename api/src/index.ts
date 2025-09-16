import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router.js';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(router);
    app.listen(3001);
  })
  .catch(() => {
    console.log('Error');
  });

