const { connectDB, getDBStatus } = require('../database/connectDB');

// Export connectDB function and getDBStatus
module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.getDBStatus = getDBStatus;
