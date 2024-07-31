import io from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://central-server.alexlevkov.com/ff"
    : "http://localhost:2000";

export const socketService = createSocketService();

socketService.setup();

function createSocketService() {
  let socket = null;
  const socketService = {
    async setup() {
      socket = io(BASE_URL);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}
