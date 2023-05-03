import io, { Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000';

export const socket: Socket = io(URL);
/* 
const getSocket = () => {
  if (!socket) {
    socket = io(URL);
  }
  return socket;
};
 */