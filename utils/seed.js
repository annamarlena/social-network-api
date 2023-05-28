const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, Thought } = require('../models');


const seedUsers = [
  {
    username: "Jack",
    email: "jack@gmail.com",
  },
  {
    username: "Jennifer",
    email: "jennifer@gmail.com"
  },
  {
    username: "Jake",
    email: "jake@gmail.com"
  }
]

const seedThoughts = [
  {
    thoughtText: "Hi",
    username: "Jennifer",
    reactions: [
      {
       reactionBody: "Hello",
       username: "Jack"
      }
    ]
  },
  {
    thoughtText: "Goodbye",
    username: "Jack",
    reactions: [
      {
       reactionBody: "Bye",
       username: "Jennifer"
      }
    ]
  },
  {
    thoughtText: "I'm sad",
    username: "Jake",
    reactions: [
      {
       reactionBody: "It'll be ok",
       username: "Jennifer"
      }
    ]
  }
]


const runSeed = async () => {
  await User.deleteMany({})
  await Thought.deleteMany({})
  await User.insertMany(seedUsers)
  await Thought.insertMany(seedThoughts)
  process.exit(0);
}

db.once('open', () => {
  runSeed()
});