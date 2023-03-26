const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    location:String,
    age:Number,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }]
},{
    versionKey:false
})


const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}