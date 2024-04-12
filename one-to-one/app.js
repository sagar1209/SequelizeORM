const express = require("express");
const bodyParser = require('body-parser');
const {Email} = require('./models');
const {User} = require('./models');
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/emails',async(req,res)=>{
    try {
        const emails = await Email.findAll({
            include : {
                model : User
            }
        });
        res.status(200).json(emails);
    } catch (error) {
        res.status(400).json({
            error : error.Message
        })
    }
})
app.get('/users',async(req,res)=>{
    try {
        const user = await User.findAll({
            include : {
                model : Email
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            error : error.Message
        })
    }
})

app.get('/',(req,res)=>{
    res.json({
        Message : "welcome to home page"
    })
})

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
