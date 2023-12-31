const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/sendResponse');

const authenticate = (req, res, next) => {
  try {
    const requestToken = (req.headers['Authorization'.toLowerCase()]);
    if (!requestToken) throw new Error("Invalid or unknown token.");
    const jwtResult = jwt.verify(requestToken.slice('Bearer '.length), process.env.JWT_TOKEN_SECRET);
    res.locals.jwt = jwtResult;
    next();
  } catch (err) {
    sendError(res, 403, err.message);
    return;
  }
}

module.exports = authenticate;