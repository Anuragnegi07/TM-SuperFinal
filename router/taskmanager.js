const express = require("express");
const router2 = express.Router();
const db = require("../db/tm_db");
const tokenverify = require("../middleware_validation/auth");


router2.use(tokenverify);

router2.get('/',async(req,res)=>{
    try{
        const user_id=req.user.id;

        const[result]=await db.query(
            "select * from task7 where user_id=?",[user_id]
        );
        res.json(result)
    }catch(error){
        res.status(500).json({error:"Database error"+error.message});
    }
})

router2.get('/:id',async(req,res)=>{
    try{
        const user_id=req.user.id;
        const task_id=req.params.id;

        const[result]=await db.query(
            "select * from task7 where id=?",[task_id]
        );
        res.json(result[0])
    }catch(error){
        res.status(500).json({error:"Database error"+error.message});
    }
})


router2.post('/',async(req,res)=>{
    try{
        
        const {task_name,description}=req.body;
        const user_id=req.user.id;

        const[result]=await db.query(
            "insert into task7(user_id,task_name,description) values(?,?,?)",[user_id,task_name,description]
        );
        res.status(201).json({message:"Task created ",taskid:result.insertId})
    }catch(error){
        res.status(500).json({message:"Database eooro",error});
    }
})

router2.put('/:id',async(req,res)=>{
    try{
        const {task_name,description}=req.body;
        const user_id=req.user.id;
        const task_id=req.params.id;

        const [result]=await db.query(
            "update task7 set task_name=?,description=? where id=? and user_id=? ",[task_name,description,task_id,user_id]
        );

        if(result.affectedRows ===0){
            return res.status(404).json({message:"task not found"})
        }
        res.json({message:"task updated sucessfully"})

    }catch(error){
        res.status(500).json({error:"database error:"+error.message});
    }
})

router2.delete("/:id",async (req,res)=>{
    try{
    const task_id=req.params.id;
    const user_id=req.user.id;

    const [result]=await db.query(
        "delete from task7 where id=? and user_id=?",[task_id,user_id]
    )
    if(result.affectedRows===0){
        return res.status(404).json({message:"task not found"})
    } 
    res.status(201).json({message:"task deleted"})
   }catch(error){
        res .status(500).json({error:"database error" +error.message});
   }
});

module.exports=router2
