const joi=require('joi');

const logchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});

const logvalid=((req,res,next)=>{
    const {error}=logchema.validate(req.body);
    if(error){
        next(error);
    }
    else{
        next();
    }

})

module.exports=logvalid;