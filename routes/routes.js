const express = require('express');
const log = require('../middleware/logger');
const { sendSuccess } = require('../utils/sendResponse');
const getProfile = require('../controllers/homeController');
const { getBlogDetail, getBlogs, postBlog, editBlog, deleteBlog } = require('../controllers/blogController');
const cors = require('cors');
const authenticate = require('../middleware/authenticate');
const authorizeDeveloper = require('../middleware/authorize');

const app = express();

app.use(log);
app.use(cors())
app.use(express.json());

// Ping function
app.get('/ping', (_, res) => {
  sendSuccess(res, {
    'answer': 'Pong!'
  });
});

// Home page 
app.get('/profile/', getProfile);

// Blogs page
app.get('/blog/', getBlogs);
app.get('/blog/:blogSlug', getBlogDetail);
app.post('/blog', authenticate, authorizeDeveloper, postBlog);
app.put('/blog/:blogSlug', authenticate, authorizeDeveloper, editBlog);
app.delete('/blog/:blogSlug', authenticate, authorizeDeveloper, deleteBlog);

module.exports = app;