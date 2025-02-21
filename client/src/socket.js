import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "localhost:3001";

export const socket = io(URL, {
    autoConnect: true
  });