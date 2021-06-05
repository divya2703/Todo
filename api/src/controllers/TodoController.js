const _ = require('lodash')
const User = require('../models/User');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



exports.getTodos = async (req, res, next) => {
	try{
    	const docs = await Todo.aggregate([
      	{
        	$project: {
				_id: 1,
				name: 1,
				createdAt: 1
        	}
	  	},
	  	{
			$sort: {
				createdAt: -1
			}
	  	}
    	])
		res.status(200).send(docs);
  	}
	catch (error){
		res.status(500).json(error.message || "Internal Server Error");
	}

}

/* no longer needed--> we'll use postUserTodo henceforth */ 
exports.postTodo = async(req,res) =>{
	try{

		let doc = new Todo({
      		name: req.body.name,
		})
		await doc.save()
		res.status(201).send(doc)
	}
	catch(error){
		res.status(500).json(error.message || "Internal Server Error");
	}
}


/* deletion, here need to make sure that reference from user is also deleted*/
exports.deleteTodo = async(req, res) =>{
	try{
		if(!req.params.id){
			res.status(400).send("Missing url parameter id ")
		}
		const todoId = ObjectId(req.params.id);
		const doc = await Todo.find({ _id: todoId });
		if(!doc){
			res.status(404).send({"message": "Todo Not found"})
		}
		const userId = doc.userId;

		await Todo.findOneAndDelete({ _id: req.params.id });
		User.updateOne(
			{ _id: userId},
			{ $pull: { todos: { $eq: todoId } } }
		)

		res.status(200).send({"message":"Successfully Deleted", "todo": doc});
	}
	catch(error){
		res.status(500).json(error.message || "Internal Server Error");
	}

}


exports.putTodo = async(req, res) =>{
	try{

		if(!req.params.id){
			res.status(400).send("Missing url parameter segment ")
		}
		else
		{
			const doc = await Todo.findOne({_id: req.params.id});
			if(!doc){
				res.status(400).send("Page not found");
			}
			else{

				doc.overwrite({
					name: req.body.name
				});
				await doc.save();
				res.status(200).send(doc);
			}
		}
	}
	catch(error){
		res.status(500).json(error.message || "Internal Server Error");
	}
}


exports.getTodo = async(req, res) =>{
	try{

		if(!req.params.id){
			res.status(400).send("Missing url parameter segment ")
		}
		else
		{
			const doc = await Todo.findOne({_id: req.params.id})
			if(!doc){
				res.status(404).send("Todo not found")
			}
			else{
				res.status(200).send(doc);
			}
		}
	}
	catch(error){
		res.status(500).json(error.message || "Internal Server Error");
	}
}