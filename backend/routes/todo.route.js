const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { TodoModel } = require("../model/todo.model")
const { UserModel } = require("../model/user.model")
const todoRoute = express.Router()

todoRoute.get("/alltodos", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId }).populate("todos");
    res.status(200).send({"data":user.todos});
  } catch (error) {
    res.status(500).send({ message: "Error getting todos" });
  }
});

todoRoute.get("/:id",async(req,res)=>{
  let data =await TodoModel.findOne({_id:req.params.id})
  res.status(200).send({todos:data})
})


todoRoute.post("/add", async(req,res)=>{
    const payload = req.body
    try {
        const todo = new TodoModel(payload)
        await todo.save()       
        const user = await UserModel.findById(payload.userId)
        if (user) {
          user.todos.push(todo._id)
          await user.save()
        }
        res.status(200).send({ "message": "todo is added" })
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

todoRoute.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
      const todo = await TodoModel.findByIdAndUpdate({_id:id}, updates, { new: true });
      if (!todo) {
        res.status(400).send({ message: "Todo not found"});

      }
      res.status(200).send({ message: "Todo updated successfully", todo });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  
todoRoute.delete("/delete/:id",async(req,res)=>{
  const id = req.params.id;

  try {
    const todo = await TodoModel.findByIdAndDelete({_id:id});
    res.status(200).send({ message: "Todo deleted successfully"});
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})
module.exports={todoRoute}
