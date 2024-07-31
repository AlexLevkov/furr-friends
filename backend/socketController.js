function setupSocket(io) {
  let rooms = {};

  const ffNamespace = io.of("/ff");

  ffNamespace.on("connection", async (socket) => {
    console.log(`${socket.id} connected to ff`);
    socket.on("order-msg", () => {
      ffNamespace.emit("update-orders");
    });

    socket.on("disconnect", () => {
      console.log("disconnect " + socket.id);
    });
  });
}

module.exports = { setupSocket };
