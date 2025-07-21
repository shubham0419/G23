const express = require("express");
const { createTodo, updateTodo } = require("../controllers/todo.controller");
const router = express.Router();
//create todo
router.post("/create",createTodo);

//search todos
router.get("/search",);

//get all todos
router.get("/all",);

//update(toggle) status of todo
router.put("/update/:id",updateTodo);

//delete todo
router.delete("/delete/:id");

module.exports = router;