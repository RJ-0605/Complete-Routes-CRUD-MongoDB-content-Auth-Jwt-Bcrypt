



const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')




UserRouter.get('/', (req, res) => res.send ('hello Authentication project home'))


UserRouter.get('/readme' , (req, res) => { 
	res.json({"message":"Welcome to the user section "})

})




UserRouter.post('/update' , (req, res) => { 
	res.json({"message":"Hello World"})

})







// authentication is done 
UserRouter.get('/secret', isAuthorized,  (req,res) => {


		// rest of commands or functions come here 
		
		res.json({"message": "Super Secret Message "});
})







UserRouter.get('/jwt' , (req,res) => {
	let privateKey = fs.readFileSync('./private.pem' , 'utf-8')
	let token = jwt.sign({"body" : "stuff"}, privateKey, {algorithm:'HS256'})
	res.send(token);

})


//Authorization function going to be used in authentication path 

function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
            // if there has been an error...
            if (err) {  
                // shut them out!
                res.status(500).json({ error: "Not Authorized" });
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized
        res.status(500).json({ error: "Not Authorized" });
    }
}





module.exports = UserRouter
