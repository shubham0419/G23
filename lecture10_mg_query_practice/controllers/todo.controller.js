const Todo = require("../models/todo.schema");


const createTodo = async(req,res)=>{
  try {
    const {task} = req.body;
    const todo = await Todo.create({
      task
    })
    res.status(201).json({todo});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const updateTodo = async (req,res)=>{
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.status(200).json({message:"todo status updated"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = {createTodo,updateTodo};