const express = require('express');
const server = express();
const morgan = require("morgan")
const helmet = require("helmet")
const mw = require("./middleware/middleware.js")
const usersRouter = require("./users/users-router")
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(express.json())
server.use(morgan("dev"))
server.use(helmet())
server.use('/api/users', mw.logger, usersRouter)

server.get('/',mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
