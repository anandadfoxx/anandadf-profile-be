const prisma = require('../model/connection');
const { sendError, sendSuccess } = require('../utils/sendResponse');

async function getProfile(_, res) {
  try {
    const experiences = await prisma.experiences.findMany({
      orderBy: {
        startDate: "desc"
      }
    });
    sendSuccess(res, {
      "experiences": experiences
    });
  } catch (e) {
    sendError(res, 503, e);
  }
}

module.exports = getProfile;