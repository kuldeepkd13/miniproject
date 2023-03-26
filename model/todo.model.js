const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:String,
    status:{"type": "boolean",default:false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{
    versionKey:false
})


const TodoModel = mongoose.model("todo",todoSchema)

module.exports={TodoModel}