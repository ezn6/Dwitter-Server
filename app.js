import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import postRouter from './router/tweets.js';
import authRouther from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', postRouter);
app.use('/auth', authRouther);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port);
initSocket(server);
// const soketIO = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// soketIO.on('connection', (socket) => {
//   console.log('Client is here!');
//   soketIO.emit('dwitter', 'hello!');
// });
