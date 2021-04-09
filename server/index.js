const express = require('express');
const bodyParser = require('body-parser');
// const { response } = require('express');
const app = express();
const port = 4000;

const carRoute = require('./controllers/carController').router;
const rentRoute = require('./controllers/rentController').router;
const officeRouter = require('./controllers/officeController').router;
const userRouter = require('./controllers/userController').router;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/', (request, response) => {
  response.send('Node.js, Express, and Postgres API');
})

//API ROUTES
app.use('/api/v1', carRoute);
app.use('/api/v1', rentRoute);
app.use('/api/v1', officeRouter);
app.use('/api/v1', userRouter);



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})