const _ = require('lodash')
const Todo = require('../models/Todo')


/* read | getting array of data*/
exports.getTodos = async (req, res, next) => {
  try{
    const docs = await Todo.aggregate([
      {
        $project:{
          _id: 1,
		  name: 1,
		  createdAt: 1
        //   description: 1
        }
	  },
	  {
		  $sort:{
			  createdAt: -1
		  }
	  }
    ])
    res.status(200).send(docs);
  }
	catch (error){
		res.status(400).send(error)
	}

}

exports.postTodo = async(req,res) =>{
	try{

		let doc = new Todo({
      name: req.body.name,
    //   description: req.body.description
		})

		await doc.save()
		res.status(201).send(doc)

	}
	catch(error){
		res.status(400).send(error)
	}
}


/* delete */
exports.deleteTodo = async(req, res) =>{
	try{
		if(!req.params.id){
			res.status(400).send("Missing url parameter id ")
		}
		const doc = await Todo.find({ _id: req.params.id });
		if(!doc){
			res.status(404).send({"message":"Todo Not found"})
		}
		await Todo.findOneAndDelete({ _id: req.params.id })
		res.status(200).send({message: "Deleted successfully!"});
	}
	catch(error){
		res.status(400).send(error)
	}

}


exports.putTodo = async(req, res) =>{
	try{

		if(!req.params.id){
			res.status(400).send("Missing url parameter segment ")
		}
		else
		{
			const doc = await Todo.findOne({_id: req.params.id})
			if(!doc){
				res.status(400).send("Page not found")
			}
			else{
				doc.overwrite({
					name: req.body.name
				});
				await doc.save();
				res.status(200).send(doc)
			}
		}
	}
	catch(error){
		res.status(400).send(error)
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
				res.status(400).send("Todo not found")
			}
			else{
				res.status(200).send(doc)
			}
		}
	}
	catch(error){
		res.status(400).send(error)
	}
}