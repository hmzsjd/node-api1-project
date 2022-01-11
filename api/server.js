// BUILD YOUR SERVER HERE
const express = require('express') // commonjs
const User = require('./users/model');

// INSTANCE OF EXPRESS APP
const server = express();


// GLOBAL MIDDLEWARE
server.use(express.json()) // parse json from requests

// GET: ALL USERS
server.get('/api/users', async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: "The users information could not be retrieved" })
    }
  })


// GET: USER BY ID
server.get('/api/users/:id', async (req, res) => {
    // console.log(req.method)
    // console.log(req.headers)
    // console.log(req.body)
    // console.log(req.params)
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
          } else {
            res.status(200).json(user)
          }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
    })

// POST: NEW USER
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ message: 'Please provide name and bio for the user' })
          } else {
            const { name, bio } = req.body
            console.log(name, bio)
            const newUser = await User.insert({ name, bio })
            console.log(newUser)
            res.status(201).json(newUser) 
          }      
      
    } catch (err) {
      res.status(500).json({ message: "There was an error while saving the user to the database"})
    }
  })

// DELETE: REMOVE USER BY ID
server.delete('/api/users/:id', async (req, res) => {
    try {
      const userToDelete = await User.remove(req.params.id)
      if (!userToDelete) {
        res.status(404).json({ message: 'The user with the specified ID does not exist'})
      } else {
        res.json(userToDelete)
      }
    } catch (err) {
      res.status(500).json({ message:"The user could not be removed" })
    }
  })

// PUT: UPDATE USER BY ID.
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    console.log(id, name, bio)
    try {
      const userToUpdate = await User.update(id, { name, bio })
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
      }
      if (!userToUpdate) {
        res.status(404).json({ message: `The user with the specified ID does not exist` })
      } 
       else {
        res.status(200).json(userToUpdate)
      }
    } catch (err) {
      res.status(500).json({ message: "The user information could not be modified" })
    }
  })



module.exports = server; // EXPORT YOUR SERVER instead of {}
