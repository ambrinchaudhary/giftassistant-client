const jsonServer = require('json-mock');
const bodyParser = require('body-parser');
const questionResponse = require('./question.json'); 
const giftCategoryResponse = require('./giftCategory.json'); 

function stabGiftService(port) {

  const server = jsonServer.create();

  server.use(bodyParser.json());
  server.use( (err, req, res, next) => {
    console.error(err.stack)
    next(err);
  });

  server.get('/question/:id', (req, res) => {
    /*if (!req.body.card) {
        res.status(400).json(responses.NO_NECTAR_CARD);
    } else if (!req.body.session) {
        res.status(400).json(responses.NO_SESSION);
    } else {
        res.json(responses.OK);
    }*/
    res.json(questionResponse);
  });

  server.get('/giftCategory/:id', (req, res) => {
    /*if (!req.body.card) {
        res.status(400).json(responses.NO_NECTAR_CARD);
    } else if (!req.body.session) {
        res.status(400).json(responses.NO_SESSION);
    } else {
        res.json(responses.OK);
    }*/
    res.json(giftCategoryResponse);
  });


  server.listen(port, () => {
    console.log(`GiftServer is stabbed at ${port}...`);
  });
}

/**
 * Stabs Smash REST API that proxies Nectar sevice 
 * @return {object} 
 */
export default {

  /**
   * Starts a stabbed srvice locally at the given port
   * @param {string} port 
   */
  start: port => {
    stabGiftService(port);
  }

}