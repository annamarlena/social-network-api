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
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill in a valid email address']
   },

   thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought"
    }
  ],

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  // id: false,
});


userSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});


const User = mongoose.model('User', userSchema);
module.exports = User; 