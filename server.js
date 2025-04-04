const express=require('express')
require('./db/db')
require('./db/tm_db')
const cors=require('cors')
const errorhandling=require('./middleware_validation/errorhandler')
const rout=require('./router/routes')
const rout2=require('./router/taskmanager')


const app=express();

app.use(cors())

app.use(express.json());

app.use('/auth',rout)
app.use('/tasks',rout2)
 
app.use(errorhandling)


const PORT=3000;
app.listen(PORT,()=>{console.log(`the server is online at ${PORT}`)})

