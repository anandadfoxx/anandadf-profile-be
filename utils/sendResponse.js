async function sendSuccess(res, data) {
  res.status(200);
  res.json(Object.assign({}, { success: true }, data));
  return;
}

async function sendError(res, errorCode, message) {
  res.status(errorCode);
  res.json({
    success: false,
    message: message
  });
  return;
}

module.exports.sendSuccess = sendSuccess;
module.exports.sendError = sendError;