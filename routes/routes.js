const express = require('express');
const log = require('../middleware/logger');
const { sendSuccess } = require('../utils/sendResponse');
const { getDescription } = require('../controllers/homeController');
const { getBlogDetail, getBlogs, postBlog } = require('../controllers/blogController');

const app = express();

app.use(log);
app.use(express.json());

// Ping function
app.get('/ping', (_, res) => {
  sendSuccess(res, {
    'answer': 'Pong!'
  });
});

// Home page 
app.get('/profile/description', getDescription);

// Blogs page
app.get('/blog/', getBlogs);
app.get('/blog/:blogSlug', getBlogDetail);
app.post('/blog', postBlog);

module.exports = app;