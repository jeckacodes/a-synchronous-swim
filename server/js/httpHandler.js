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
  // console.log('Request: ', req)

  // If the request is for an image, the req will contain postData
  if (req._postData !== undefined) {
    if (!fs.existsSync(req.url)) {
      res.writeHead(404, headers);
    } else {
      // path does exist; dance
      res.writeHead(200, headers);
      console.log('image exists')
      res.write(fs.readFileSync(req.url))
      // also, send the image in response
    }

  } else { // If the request is just GETting commands
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
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
