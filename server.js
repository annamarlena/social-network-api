const express = require('express');
const db = require('./config/connection');

// Require model
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CHOOSE ONE OF THE OPTIONS BELOW
app.post('/new-department/:department', (req, res) => {
  Department
    .create({ name: req.params.department })
    .then( data => res.json({data}))
    .catch( err => res.status(400).json({err} ) )
}); 

// app.post('/new-department/:department', async (req, res) => {
//   try {
//     const data = await Department.create({ name: req.params.department })
//     res.json({data})
//   } catch(err){
//     res.status(400).json({err} )
//   }
// });

app.delete('/department/:id', async (req, res) => {
  
})


// CHOOSE ONE OF THE OPTIONS BELOW

app.get('/all-departments', (req, res) => {
  Department.find({})
    .then( result => res.status(200).json({result}) )
    .catch( err => res.status(400).json({ err }))
});

// app.get('/all-departments', async (req, res) => {
//   try {
//     const result = await Department.find({})
//     res.status(200).json({result})
//   } catch(err){
//     res.status(400).json({err} )
//   }
// });



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
