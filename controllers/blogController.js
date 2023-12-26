const prisma = require("../model/connection");
const bindBodyOrError = require("../utils/binds");
const { sendError, sendSuccess } = require("../utils/sendResponse");

async function getBlogs(req, res) {
  const reqBody = bindBodyOrError(req, res, "page");
  if (reqBody == null) return;

  const blogs = await prisma.blogs.findMany({
    select: {
      slug: true,
      date_posted: true,
      title: true,
      description: true,
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

  const blog = await prisma.blogs.findUnique({
    where: {
      slug: blogSlug
    },
  });
  if (!blog) {
    sendError(res, 404, "Blog not found.");
    return;
  } 
  sendSuccess(res, {
    "id": blog.id,
    "title": blog.title,
    "slug": blog.slug,
    "date_posted": blog.date_posted,
    "description": blog.description
  });
}

async function postBlog(req, res) {
  const reqBody = bindBodyOrError(req, res, "title", "slug", "description");
  if (reqBody == null) return;

  // Title length more than 100 characters, then refuse
  if (reqBody.title.length > 100) {
    sendError(res, 400, "'title' cannot be more than 100 characters.");
    return;
  }

  const existBlogs = await prisma.blogs.findUnique({
    where: {
      slug: reqBody.slug
    }
  });
  if (existBlogs) {
    sendError(res, 409, "Blog already posted, check your slug");
    return;
  }

  const newBlog = await prisma.blogs.create({
    data: {
      date_posted: (new Date()).toISOString(),
      title: reqBody.title,
      slug: reqBody.slug,
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
}

module.exports.getBlogs = getBlogs;
module.exports.getBlogDetail = getBlogDetail;
module.exports.postBlog = postBlog;