const { sendError } = require("./sendResponse");

function bindBodyOrError(req, res, ...params) {
  let body;
  switch (req.method) {
    case 'GET':
      body = req.query;
      break;
    case 'POST':
      body = req.body;
      break;
    case 'PUT':
      body = req.body;
      break;
  }

  let invalidParams = [];

  params.forEach((param) => {
    if (body[param] == null || body[param] == undefined)
      invalidParams.push(param);
  });
  if (invalidParams.length > 0) {
    // return error invalid request
    sendError(res, 400, `Missing value of ${invalidParams.join(", ")}`);
    return null;
  }
  
  return body;
}

module.exports = bindBodyOrError;