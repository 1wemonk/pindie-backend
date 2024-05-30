const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter=require('./routes/apiRouter');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');
const cookieParser = require("cookie-parser");
const connectToDatabase = require('./database/connect');
const cors = require('./middllewares/cors');
const pagesRouter = require('./routes/pages');

const app = express();
const PORT = 3001;
connectToDatabase();

app.use(
  cors,
  cookieParser(), 
  bodyParser.json(),
  apiRouter,
  pagesRouter,
  express.static(path.join(__dirname, 'public')),
);

app.listen(PORT);
