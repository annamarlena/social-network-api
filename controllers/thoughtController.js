//const {ObjectId} = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          count: await count(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // GET a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json({
            thought,
            reaction: await reaction(req.params.thoughtId),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // CREATE a new thought
  createThought(req, res) {
    Thought.create(req.body) 
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id }},
          { new: true }
        ).then( updatedUser => res.json({ updatedUser }))
      })
      .catch((err) => res.json(err));
  },


  // DELETE a thought and remove reactions
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $push: { friends: req.params.friendId } },  // might be $addToSet
              { $push: { reactions: req.body } },
              { $pull: { reactions: {reactionId: req.params.reactionId }} },
              { new: true }
            )
      )
      .then((reaction) => 
        !reaction
          ? res.status(404).json({ message: "Thought deleted, but no reactions found"})
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}