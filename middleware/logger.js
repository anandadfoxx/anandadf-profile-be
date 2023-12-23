function log(req, _, next) {
  // Gin golang style for logging
  console.log(`${req.method} | ${req.socket.remoteAddress} | ${(new Date()).toISOString()}`);
  next();
}

module.exports = log;