import io, { Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000';

let socket: Socket;

const getSocket = () => {
  if (!socket) {
    socket = io(URL);
  }
  return socket;
};

export default getSocket;