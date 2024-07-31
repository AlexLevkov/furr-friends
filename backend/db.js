const mongoose = require("mongoose");

const wwDb = mongoose.createConnection(process.env.MONG_URI_WW);
const csDb = mongoose.createConnection(process.env.MONG_URI_CS);
const ffDb = mongoose.createConnection(process.env.MONG_URI_FF);

module.exports = { wwDb, csDb, ffDb };
