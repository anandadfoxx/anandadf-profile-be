const { ROLE_DEVELOPER } = require('../utils/consts');
const {sendError} = require('../utils/sendResponse');

const authorizeDeveloper = (_, res, next) => {
  if (res.locals.jwt.role != ROLE_DEVELOPER) {
    sendError(res, 403, "Prohibited.");
    return;
  }
  next();
}

module.exports = authorizeDeveloper;