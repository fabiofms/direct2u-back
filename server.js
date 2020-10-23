const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({extended:false}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

connectDB();


// Define Routes
app.use('/api/profile', require(__dirname + "/routes/api/profile"))
app.use('/api/user', require(__dirname + "/routes/api/user"))
app.use('/api/auth', require(__dirname + "/routes/api/auth"))
app.use('/api/product', require(__dirname + '/routes/api/product'))
app.use('/api/sale', require (__dirname + "/routes/api/sale"))
app.use('/api/client', require (__dirname + "/routes/api/client"))

// Serve Static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8081

const server = app.listen(PORT, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at htpp://%s:%s', host, port);
  })
