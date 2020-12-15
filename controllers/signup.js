

const bcrypt = require('bcrypt')
const SignupRouter = require('express').Router()
const User = require('../models/user')



SignupRouter.get('/', async (request, response, next) => {

// check if user already exist 

  // const users = await User
  // .find({}).populate('notes', { content: 1, date: 1})
  
  
  // this is to serve something in the future 
  
  
  
 // response.json(users.map(user => user.toJSON()))
  
  response.json("Nothing to get for now only posts are recieved ")
})



SignupRouter.post('/', async (request, response, next) => {

   var msg = ""

  const user_email = request.body["useremail"];
  
  
  console.log(request.body)
  // Get users from database by email 
  
  const userfound = await User.findOne({useremail:user_email});
  
  console.log(userfound)
      
					 	
					 	
  
  if (!userfound){

				  
				  try {
						 const body = request.body

						 const saltRounds = 10
						 const passwordHash = await bcrypt.hash(body.password, saltRounds)
						 
						 
						 const  useremail = user_email
						 const  username  =  body["username"]
                   const  age       =  body["age"]
                   
						 const user = new User ({
						 
						   useremail ,
							username  ,
							age,
							passwordHash
						 })

						 const savedUser = await user.save()
						 msg = "Signup successful"
						 console.log(msg)
						 
						 response.json(savedUser.toJSON())
						 
				  } catch (exception) {
				  		msg = exception
				  		console.log(msg)
					 	next(msg)
				  }
				  
	}else if(userfound){ 
							msg = "useralready exists";
							console.log(msg)
						next( new Error("User Exists") );
							 }
})


module.exports = SignupRouter


