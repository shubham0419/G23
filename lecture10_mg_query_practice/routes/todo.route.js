const express = require("express");
const { createTodo, updateTodo, searchTodos, getAllTodo, deleteTodo } = require("../controllers/todo.controller");
const router = express.Router();
//create todo
router.post("/create",createTodo);

//search todos
router.get("/search",searchTodos);

//get all todos
router.get("/all",getAllTodo);

//update(toggle) status of todo
router.put("/update/:id",updateTodo);

//delete todo
router.delete("/delete/:id",deleteTodo);

// edit todo
router.put("/edit/:id");

module.exports = router;