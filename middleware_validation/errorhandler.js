const errorhandling=((err,req,res,next)=>{
  console.error(err);
  if(err.isJoi){
    return res.status(400).json({message: err.details[0].message});
  }
  res.status(500).json({message:"something went wrong"});
})

module.exports=errorhandling;