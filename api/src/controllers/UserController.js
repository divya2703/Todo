const _ = require('lodash')
const User = require('../models/User');
const Todo = require('../models/Todo');
const utils = require('../lib/utils');
const Errors = require('../config/Error');
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;


exports.auth = async(  req, res ) =>{
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
}

exports.getUsers = async(req, res) =>{
    const docs = await User.aggregate([
        {
          $project: {
            _id: 1,
            username: 1,
            createdAt: 1,
          }
        }
      ])
      res.status(200).send(docs);
}

exports.registerUser = async(req, res) =>{
    try {

        if(!req.body.password || !req.body.username || !req.body.email){
            res.status(402).send("username, password, and email  are all mandatory fields");
        }
        const username = req.body.username;
        const email = req.body. email;
        const password = req.body.password;
        const saltHash = utils.genPassword(password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const doc = new User({
            username: username,
            hash: hash,
            salt: salt,
            email: email
        });

        await doc.save()
        res.status(200).send(doc);

    } 
    catch (error) {
        res.status(500).send({"error": error});
    }
}

exports.loginUser = async(req, res) =>{
    try{

        if(!req.body.password || !req.body.username){
            res.status(402).send("username and password both fields are needed");
        }
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(401).send({ success: false, msg: "could not find user" });
        }
       // console.log(user);
        const isValid = utils.validPassword(password, user.hash, user.salt);
       // console.log(isValid)
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        }
        else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }   
    }
    catch (error) {
        res.status(500).send({"error": error});     
    }
}



exports.postUserTodo = async(req, res) => {
	try{

        const username = req.body.username;
        const name = req.body.name
        var user = await User.findOne({ username: username});
       // console.log(user);
		let todo = new Todo({
            name: name,
            userId: user._id
		})
        await todo.save();
        //console.log(todo);
        user.todos.unshift(todo._id); //JS has arrays implemented as deque, so this is O(1) operation
        await user.save()
		res.status(201).send(todo);

	}
	catch (error) {
        res.status(500).send({"error": error});     
    }
}


exports.getUserTodos = async(req, res) => {
	try{
        
        if(!req.params.userId){
            res.status(400).send({"error": "userId is required"});
            return;
        }
        const userId = req.params.userId;
        const user = await User.findOne({_id: userId});
       // console.log(user);
        if(!user){
            res.status(400).send({"error": "User Not found"});
        }
        else{
            const ids = user.todos;
            // console.log(ids);
            const todos = await Todo.find().where('_id').in(ids).exec();
            res.status(200).send(todos);
        }
          
    }
	catch(error){
		res.status(500).json(error.message || "Internal Server Error");
	}
}

