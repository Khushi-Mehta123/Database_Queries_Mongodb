
const express = require('express')
const app = express()
const notfound = require('./middleware/notfound')
const connectDB = require('./connect/db')
const router = require('./routers/route')

app.get('/',(req,res)=>{
    res.send('stopre api <a href = "/api/v1/products"> Product </a>')
})
app.use(express.json())
app.use('/api/v1/products',router)

app.use(notfound)

const start = ()=>{
    try {
        async function run(){
            await connectDB
            app.listen(5000,()=>{
                console.log("connected");
                console.log("Server listening on port 5000");
            })
        }
        return run()
    } 
    catch (error) {
        console.log(error);
    }
}

start()
