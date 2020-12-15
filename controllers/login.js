const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const loginRouter = require('express').Router()
const User = require('../models/user')





loginRouter.post('/',  async (request, response) => {
  const body = request.body


  const user = await User.findOne({ username: body.username});
  const passwordCorrect = user === null
    ? false
  //  : console.log(user)
    : await bcrypt.compare(body.password, user.passwordHash);
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }


		let privateKey = fs.readFileSync('./private.pem' , 'utf-8')
		
	   let token = jwt.sign( userForToken , privateKey, {algorithm:'HS256'})
	 
    console.log("logged in successfully")
    response
      .status(200)
      .send({ token, username: user.username })
      
})




module.exports = loginRouter
