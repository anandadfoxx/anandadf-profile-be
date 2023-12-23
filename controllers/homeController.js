const prisma = require('../model/connection');
const { sendError, sendSuccess } = require('../utils/sendResponse');

async function getBriefDescription(req, res) {
  try {
    const profile = await prisma.profile.findFirst({
      select: {
        description: true,
      }
    });
    sendSuccess(res, {
      "description": profile.description
    });
  } catch (e) {
    sendError(res, 503, e);
  }
}

module.exports.getDescription = getBriefDescription;