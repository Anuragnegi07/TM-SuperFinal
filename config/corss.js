const cors=require("cors");

const corsOption={
    origin:"https://task-manager-frontend-e6c99.web.app",
    Credential:true,
};

module.exports=cors.apply(corsOption)