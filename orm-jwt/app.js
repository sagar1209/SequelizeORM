const express = require("express");
const bodyParser = require('body-parser');
const { Sequelize } = require("sequelize");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JwtConfig = require('./config/jwt-config');
const { checkToken} = require('./config/jwt-middlerware')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const sequelize = new Sequelize('orm_jwt', 'root', 'Sagar@05', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then((success) => {
    console.log("Connected successfully");
}).catch((error) => {
    console.log("Connection failed: " + error);
});

const User = sequelize.define('tbl_users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:false,
    },
    email : {
        type:Sequelize.STRING(50),
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING(150),
        allowNull:false, 
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:1,
    }
},{
    timestamps:false,
    modelName:"User",
});

// User.sync();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the home page" });
});
app.get("/profile",checkToken, (req, res) => {
    res.status(200).json({ message: req.user });
});

app.post('/validate',async(req,res)=>{
    try {
        console.log(req.headers)
        const userToken = req.headers['authorization'];
        JWT.verify(userToken,JwtConfig.secret,(error,decode)=>{
            if(error){
                res.status(500).json({
                    error : error.message,
                })
            }
            else{
                res.status(200).json({
                    message :"token is valid",
                    data : decode
                })
            }
        })
        
    } catch (error) {
        
    }
})

app.post('/user',async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password,10);
    const status = req.body.status;
    try {

        const match = await User.findOne({
            where:{
                email
            }
        })
        if(match){
             return res.json({
                message:"email is exits"
            })
        }
        const user = await User.create({
            name,
            email,
            password,
            status,
        })
        
        res.status(201).json({
            message:"user created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.post('/login',async(req,res)=>{
    try { 
        const user = await User.findOne({
            where:{
                email: req.body.email,
            }
        })
        if(!user){
            return res.status(400).json({
                error : "email is not exits"
            })
        }
        const isPassword = await bcrypt.compare(req.body.password,user.password);
        if(!isPassword) return res.status(400).json({
            error : "password didn't match"
        })

        const token = JWT.sign({
            id :  user.id,
            email : user.email,
        },JwtConfig.secret,{
            expiresIn : JwtConfig.expiresIn,
            notBefore : JwtConfig.notBefore,    // after 1 minut we are able to use 
            audience : JwtConfig.audience,
            issuer : JwtConfig.issuer,
            algorithm : JwtConfig.algorithm,
        })
        res.status(200).json({
            message:"successfully login",
            token
        })
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
