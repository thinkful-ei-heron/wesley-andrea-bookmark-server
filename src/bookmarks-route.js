/* eslint-disable strict */
const express = require('express');
const uuid = require('uuid/v4');
const logger = require('./logger');
const bookmarkRouter = express.Router();
const bookmarks = require('./bookmarkData');

bookmarkRouter.get('/', (req, res) =>{
  res.json(bookmarks);
});

bookmarkRouter.get('/:id', (req, res) =>{
  const { id }= req.params;
  // eslint-disable-next-line eqeqeq
  const bookmark = bookmarks.find(b => b.id == id);

  if(!bookmark){
    logger.error(`Bookmark with id ${id} not found,`);
    return res
      .status(404)
      .send('Bookmark not found');
  }
  res.json(bookmark);
});

module.exports = bookmarkRouter;