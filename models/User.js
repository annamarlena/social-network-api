const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   thoughts: [ thoughtSchema ],
   friends: [ userSchema ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});


userSchema.virtual('friendsCount').get(function () {
  return `${this.friends.length}`;
});

let count = await User.findById()  // <------- need to insert the user id here, not sure how in mongo

count.friendsCount 

const User = mongoose.model('User', userSchema);
module.exports = User;