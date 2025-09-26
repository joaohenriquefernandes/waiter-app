import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    app.use((request, response, next) => {
      response.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.115:5173');
      response.setHeader('Access-Control-Allow-Methods', '*');
      response.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use(express.json());
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(router);
    server.listen(3001);
  })
  .catch(() => {
    console.log('Error');
  });

