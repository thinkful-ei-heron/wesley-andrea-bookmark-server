/* eslint-disable strict */
const express = require('express');
const uuid = require('uuid/v4');
const logger = require('./logger');
const bookmarkRouter = express.Router();
const bookmarks = require('./bookmarkData');

bookmarkRouter.get('/', (req, res) =>{
  res.json(bookmarks);
});

//GET
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

//POST
bookmarkRouter.post('/', (req,res)=>{
  const{ title,url,description = '', rating } = req.body;
  const id = uuid();

  if (!title){
    logger.error('Must have title.');
    return res.status(400).send('Title not found');
  }
  if (!url){
    logger.error('Must have url.');
    return res.status(400).send('Url not found');
  }
  if (!rating){
    logger.error('Must have rating.');
    return res.status(400).send('Rating not found');
  }
  const bookmark = {
    id,
    title,
    url,
    description,
    rating
  };

  bookmarks.push(bookmark);
  logger.info(`Bookmark with id ${id} created`);
  res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json(bookmark);
});

//DELETE
bookmarkRouter.delete('/:id', (req, res) =>{
  const { id } = req.params;
  // eslint-disable-next-line eqeqeq
  const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

  if(bookmarkIndex === -1){
    logger.error(`Bookmark with id ${id} not found.`);
    return res  
      .status(404)
      .send('Not found');
  }

  bookmarks.splice(bookmarkIndex, 1);
  
  logger.info(`Bookmark with id ${id} deleted.`);

  res.status(204).end();
});




module.exports = bookmarkRouter;