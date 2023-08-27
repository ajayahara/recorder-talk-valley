require('dotenv').config();
const express=require("express");
const cors=require("cors");
const jwt=require("jsonwebtoken")
const { connection } = require("./config/db.js");
const { UserModel } = require('./schema/user.model.js');
const app=express();
app.use(cors())
app.use(express.json());
app.get("/",async (req,res)=>{
    try {
        res.json({"msg":"You are at home"})
    } catch (err) {
       res.send({err})
    }
})
app.post("/user/resister",async (req,res)=>{
    const {name,email,password}=req.body;
    try {
        const existingusers=await UserModel.find({email});
        if(existingusers.length){
            res.json({ok:true,msg:"User Already Exit"})
        }else{
            const newUser=new UserModel({name,email,password});
            await newUser.save();
            res.json({ok:true,msg:"Registration Successful"})
        }
    } catch (err) {
       res.json({ok:false,msg:"An Error Occured"})
    }
})
app.post("/user/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const existingusers=await UserModel.find({email,password});
        if(!existingusers.length){
            res.json({ok:true,msg:"No User Found"})
        }else{
            const token=jwt.sign({userId:existingusers[0]._id},process.env.PRIVATE_KEY);
            res.json({ok:true,msg:"Login Successful",token,name:existingusers[0].name})
        }
    } catch (err) {
        console.log(err)
        res.json({ok:false,msg:"An Error Occured"}) 
    }
})
app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (err) {
        console.log(err)
    }
})