const express = require('express')

const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const session = require('express-session')
const flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// view engine
app.set('view engine', 'EJS')

// for file upload
app.use(fileUpload({useTempFiles: true}));
// connected to monodb
connectDb()
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));
//cookies 
const cookieParser = require('cookie-parser');
app.use(cookieParser())
 // insert CSS and img
 app.use(express.static('public'))
// data get 
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(flash());

  //route load
  app.use('/', web)








// route hosthost:3000 ('/') /Cannot GET /about

app.get('/', (_req, res) => {
res.send('Hello World!')
  })
  
app.get('/about', (req, res) => {
res.send('About page')
  })
  app.get('/team1', (req, res) => {
res.send('team page')
  })
  app.get('/login', (req, res) => {
 res.send('login page')
 })
// server create
app.listen(port, () => {
console.log(`server start port  localhost:${port}`);
 })
 