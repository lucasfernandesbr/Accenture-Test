import express from 'express';
import 'dotenv/config';

import Routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.Middlewares();
    this.Routes();
  }

  Middlewares() {
    this.server.use(express.json());
  }

  Routes() {
    this.server.use(Routes);
  }
}

export default new App().server;
