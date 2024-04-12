const express = require('express');
const { Student } = require('../models'); // Assuming your model file exports Product
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config');
const checkToken = require('../config/jwt-middleware')

const op = Sequelize.Op;

const router = express.Router();

router.get('/profile',checkToken.validateToken,async(req,res)=>{
    try {
        const student = await Student.findOne({
           where : {
               id: req.user.id,
           }
        })  
        res.status(200).json({
            student,
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.post('/student',async(req,res)=>{
    console.log(req.body)
    try {
        const isMatch = await Student.findOne({
            where : {
                email : req.body.email,
            }
        })
        if(isMatch){
            return res.status(400).json({
                message : "student already exits"
            })
        }
        const user = await Student.create({
            name: req.body.name,
            email : req.body.email,
            roll_no : req.body.roll_no,
            password : bcrypt.hashSync(req.body.password,10),
        })
        res.status(201).json({
            message:"user created",
            user,
        })
        
    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try { 
        const user = await Student.findOne({
            where : {
                email:req.body.email,
            }
        })
        if(!user){
            return  res.status(400).json({
                message : "user does not exit"
            })
        }
        const isMatch =  await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(400).json({
                error : "password didn't matched",
            })
        }
        const token = JWT.sign({
            id : user.id
        },jwtConfig.secret,{
            expiresIn:jwtConfig.expiresIn,
            notBefore:jwtConfig.notBefore
        })
        res.status(200).json({
            message:"successfully login",
            token
        })

    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

module.exports = router;