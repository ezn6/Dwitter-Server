import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

//Socket 클래스는 socket.io서버 준비하고, 토큰가져오고 에러처리하고, connection열어주는 클래스
class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    //토큰을 가져오고, 에러처리
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
  //socket이 이미 있다면 새롭게 만들어주지 않아도 된다
}

export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io; //Socket class안에 있는 io를 전달한다
}

//EX
// const server = app.listen(config.host.port);
// initSocket(server);
// const soketIO = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// soketIO.on('connection', (socket) => {
//   console.log('Client is here!');
//   soketIO.emit('dwitter', 'hello!');
// });
