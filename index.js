// require your server and launch it
const server = require ('./api/server.js');

server.listen(5000, () => {
    console.log("server running on localhost 5000")
});
