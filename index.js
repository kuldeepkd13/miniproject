const express = require("express")
const cors = require('cors')
const app = express()
const {connection} = require("./db")
const {userRoute} = require("./routes/user.route")
const {todoRoute}= require("./routes/todo.route")
const {auth}=require("./middleware/auth.middleware")
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/user",userRoute)
app.use("/todo",auth,todoRoute)

app.listen(process.env.Port, async()=>{
    try {
        await connection
        console.log("connected to mongoose")
    } catch (error) {
        console.log(error)
        console.log("Not connected to mongoose")
    }
    console.log(`server is running ${process.env.Port}`);
})