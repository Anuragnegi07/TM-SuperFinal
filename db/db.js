require('dotenv').config()
const db=require('mysql2/promise')

const connect=db.createPool({
    host:process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
    user:process.env.DB_USERNAME || 'root',
    password:process.env.DB_PASSWORD || 'JyKGPlquofuCkWNgFGyRoDtRvhRgZkJE',
    database:process.env.DB_NAME || 'railway',
    port:process.env.DB_PORT ||  49560,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0,
})

connect.getConnection()
    .then(connection=>{
        console.log("mysql is up and running");
        connection.release();
    })
    .catch(err=>{
        console.log("DB connection err",err);
    });


module.exports=connect;
