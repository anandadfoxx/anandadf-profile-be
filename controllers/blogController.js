const prisma = require("../model/connection");
const bindBodyOrError = require("../utils/binds");
const { ROLE_DEVELOPER } = require("../utils/consts");
const { sendError, sendSuccess } = require("../utils/sendResponse");

async function getBlogs(req, res) {
  const reqBody = bindBodyOrError(req, res, "page");
  if (reqBody == null) return;

  const blogs = await prisma.blogs.findMany({
    select: {
      slug: true,
      date_posted: true,
      title: true,
      short_description: true,
    },
    orderBy: {
      date_posted: "desc"
    },
    skip: reqBody.page * 10,
    take: 10
  });

  sendSuccess(res, {
    "blogs": blogs
  });
}

async function getBlogDetail(req, res) {
  const blogSlug = req.params['blogSlug'];

  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        slug: blogSlug
      },
    });
    sendSuccess(res, {
      "id": blog.id,
      "title": blog.title,
      "slug": blog.slug,
      "date_posted": blog.date_posted,
      "description": blog.description
    });
  } catch (e) {
    sendError(res, 404, "Blog not found.");
    return;
  } 
}

async function postBlog(req, res) {
  const reqBody = bindBodyOrError(req, res, "title", "slug", "short_description", "description");
  if (reqBody == null) return;

  // Title length more than 100 characters, then refuse
  if (reqBody.title.length > 100) {
    sendError(res, 400, "'title' cannot be more than 100 characters.");
    return;
  }
  
  try {
    const newBlog = await prisma.blogs.create({
      data: {
        date_posted: (new Date()).toISOString(),
        title: reqBody.title,
        slug: reqBody.slug,
        short_description: reqBody.short_description,
        description: reqBody.description
      }
    });
    if (!newBlog.id) {
      sendError(res, 503, "Error creating blog in server, please try again later.");
      return;
    }
    sendSuccess(res, {
      "message": "New blog has been created."
    });
  } catch (e) {
    sendError(res, 409, "Blog already posted, check your slug");
    return;
  }

}

async function editBlog(req, res) {
  const blogSlug = req.params['blogSlug'];
  const reqBody = bindBodyOrError(req, res, "title", "short_description", "description");
  if (reqBody == null) return;

  try {
    await prisma.blogs.update({
      where: {
        slug: blogSlug
      },
      data: {
        title: reqBody['title'],
        short_description: reqBody['short_description'],
        description: reqBody['description']
      }
    });
    sendSuccess(res, {
      "message": `Blog ${blogSlug} has been edited successfully.`
    });
  } catch (e) {
    sendError(res, 404, "Blog not found.");
    return;
  }
}

async function deleteBlog(req, res) {
  try {
    const blogSlug = req.params['blogSlug'];
    await prisma.blogs.delete({
      where: {
        slug: blogSlug
      }
    });
    sendSuccess(res, {
      "message": `Blog ${blogSlug} has been deleted successfully.`
    });
  } catch (err) {
    sendError(res, 404, "Blog not found.");
    return;
  }
}

module.exports.getBlogs = getBlogs;
module.exports.getBlogDetail = getBlogDetail;
module.exports.postBlog = postBlog;
module.exports.editBlog = editBlog;
module.exports.deleteBlog = deleteBlog;