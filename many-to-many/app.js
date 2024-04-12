const express = require("express");
const bodyParser = require('body-parser');
const {User} = require('./models');
const {Role} = require('./models');
const {UserRole} = require('./models');
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/roles',async(req,res)=>{
    try {
        const roles = await Role.findAll({
            include : {
                model : User,
                through : {
                    model : UserRole
                }
            }
        });
        res.status(200).json(roles);
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
                model : Role,
                through:{
                    model : UserRole
                }
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
