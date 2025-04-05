const mysql=require('mysql2/promise')
require('dotenv').config();

const db=mysql.createPool({
    host:process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
    user:process.env.DB_USERNAME || 'root',
    password:process.env.DB_PASSWORD || 'JyKGPlquofuCkWNgFGyRoDtRvhRgZkJE',
    database:process.env.DB_NAME || 'railway',
    port:process.env.DB_PORT ||  49560,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0,
})
db.getConnection()
.then(connection=>{
    console.log("mysql is up and running for task_mgr");
    connection.release();
})
.catch(err=>{
    console.log("databse connection error ",err);
})

module.exports=db;
