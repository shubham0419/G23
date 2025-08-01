const Todo = require("../models/todo.schema");

const createTodo = async(req,res)=>{
  try {
    const {task,status} = req.body;
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

const deleteTodo = async (req,res)=>{
  try {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({message:"todo deleted successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getAllTodo = async (req,res)=>{
  try {
    const todos = await Todo.find();
    res.status(200).json({todos})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const searchTodos = async (req,res)=>{
  try {
    const {search} = req.query;
    const matchedTodos = await Todo.find({task:{$regex:search,$options:"i"}});
    res.status(200).json({todos:matchedTodos});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const editTodo = async(req,res)=>{
  try {
    const {task} = req.body;
    const {id} = req.params;
    const result = await Todo.updateOne({_id:id},{task:task});
    res.status(200).json({result});
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}
module.exports = {createTodo,updateTodo,deleteTodo,getAllTodo
  ,searchTodos,editTodo};