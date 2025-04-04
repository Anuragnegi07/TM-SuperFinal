const joi=require('joi');

const taskschema=joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});

const cstmvalidation=((req,res,next)=>{
    const {error} = taskschema.validate(req.body);
    if(error){
        return next(error);
    }
    else{
        next();
    }
})

module.exports=cstmvalidation;