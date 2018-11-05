// let's go!
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.express.use(cookieParser())
// decode the jwt so we can get the user id from the request
server.express.use((req, res, next)=>{
  const { sick_fits_token } = req.cookies
  const token = sick_fits_token
  if(token){
    const {userId} = jwt.verify(token, process.env.APP_SECRET)
    //put the user id on future requests to access
    req.userId = userId
  }
  next()
})
// TODO use express middleware to handle cookies ( jwt )
// TODO use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`)
  })
