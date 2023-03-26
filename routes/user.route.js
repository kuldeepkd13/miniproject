const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const userRoute = express.Router()


userRoute.post("/register",async(req,res)=>{
    const {username,email,password,location,age} = req.body
       
    try {
        bcrypt.hash(password, 5,  async (err, hash)=> {
            const user = new UserModel({username,email,password:hash,location,age})
            await user.save()
            res.status(200).send({"massage":"registraion sucessfull"})
        });
    } catch (error) {
        res.status(400).send({"massage":error.massage})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                  if(result){
                    res.status(200).send({"massage":"login success", "token":jwt.sign({ userId: `${user._id}` }, 'name')})
                  }else{
                    res.status(400).send({"massage":"Wrong email or password"})
                  }
            });
        }else{
            res.status(400).send({"massage":"Wrong email or password"})
        }
    } catch (error) {
        res.status(400).send({"massage":error.massage})
    }
})


module.exports={userRoute}