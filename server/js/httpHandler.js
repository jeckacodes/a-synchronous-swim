const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const mQ = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    //dequeue messages and add them to an object
    // add object as part of response
    console.log('getting things')
    var messages = mQ.dequeue();
    if (messages !== undefined) {
      res.write(messages);
      console.log(messages);
    }
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
