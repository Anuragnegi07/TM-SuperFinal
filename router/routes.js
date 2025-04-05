const express=require('express')
const router=express.Router();
const db=require('../db/db')
const cstmvalidation=require('../middleware_validation/validation')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const tokenverify = require('../middleware_validation/auth');
const logvalid = require('../middleware_validation/oginvalidation.js');
require('dotenv').config()

router.get('/',async (req,res)=>{
    try{
        const [result]=await db.query(
            "select * from jwtauth"
        )
        res.status(201).json({message:"succesful",data:result})
    }catch(error){
        res.status(500).json({error:"db error"+error.message})
    }
})

router.post('/signup',cstmvalidation,async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        const [exsistsuser]=await db.query(
            "select * from jwtauth where email=?",[email]
        )
        if(exsistsuser.length>0){
            return res.status(400).json({message:"user already exsists"})
        }

        const hashpass=await bcrypt.hash(password,7);
        const [result]=await db.query(
            "Insert into jwtauth(username,email,password) values (?,?,?)",
            [name,email,hashpass]
        )

        // token genration !!!
        const token=jwt.sign({id:result.insertId,email},"darakoila",{expiresIn:"1h"})

        res.status(201).json({message:" Sign Up successful " ,token})

    }catch(error){
        return res.status(500).json({error:"database error"+error.message})
    }
})


router.post('/login',logvalid, async (req,res)=>{
    try{    
        const {email,password}=req.body;
        const [result]=await db.query(
            "select * from jwtauth where email=?",[email]
        )
        if(result.length === 0){
            return res.status(404).json({message:"user not found please signup "});
        }

        const ismatch=await bcrypt.compare(password,result[0].password)
        
        if(!ismatch){
            return res.status(401).json({error:"Invalid credentials"});
        }

        const token=jwt.sign({id:result[0].id,email},"darakoila",{expiresIn:"1h"})

        res.status(201).json({message:"login successful",token})

    }catch(error){
        res.status(500).json({error:"db error "+error.message});
    }
})

router.get('/profile',tokenverify,(req,res)=>{
    try{
        console.log("Request User Data:",req.user);
        res.json({message:"user Profile",user:req.user})
    }catch(error){
        res.status(500).json({error:"Database error"});
    }
})

module.exports=router;