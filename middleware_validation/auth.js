
const jwt=require('jsonwebtoken')

const tokenverify=(req,res,next)=>{
    try{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"no token provided"});
    }

    const valid=jwt.verify(token,"darakoila");
    req.user=valid;
    next();
    }catch(error){
        res.status(401).json({error:"invalid token"})
    }
};
module.exports=tokenverify;