/* eslint-disable strict */
const express = require('express');
const uuid = require('uuid/v4');
const logger = require('./logger');
const bookmarkRouter = express.Router();
const bookmarks = require('./bookmarkData');
const bodyParser = express.json();

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

bookmarkRouter.post('/',(req,res)=>{
  const title = req.body.title;
  const url = req.body.url;
  const description = req.body.description || ' ';
  const rating = req.body.rating;

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




module.exports = bookmarkRouter;