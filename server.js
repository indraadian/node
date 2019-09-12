const http = require('http');
const app = require('./app');


const server = http.createServer(app);

const port = process.env.PORT ||3000;

server.listen(port);

<<<<<<< HEAD

// mongodb+srv://indraa:<password>@node-rest-shop-dtcc7.mongodb.net/test?retryWrites=true&w=majority
//hsdf;jahdflsgdlasudguy
=======
>>>>>>> 69ad09c2effa18c0ee35009e56678d452dbf67d5
