const mongoose = require('mongoose')

// const uniqueValidator = require('mongoose-unique-validator')


const mongooseFindAndFilter = require('mongoose-find-and-filter');

const userSchema = new mongoose.Schema({
  useremail: {
    type: String,
    unique: true
  },
  username: String,
  passwordHash: String,
  
})



userSchema.plugin(mongooseFindAndFilter);

// userSchema.plugin(uniqueValidator);

// strip away the mogoose id from the data and work with the rest 
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
