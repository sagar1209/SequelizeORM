const express = require('express');
const productRouter = require('./routes/products')
const studentRouter = require('./routes/student')
const bodyParser = require('body-parser')

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/',productRouter);
app.use('/',studentRouter);

app.get("/",(req,res)=>{
    res.json({
        message:"welcome to our home page"
    })
})

app.listen(PORT,()=>{
    console.log("server start on " + PORT);
})