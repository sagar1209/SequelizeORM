const express = require("express");
const bodyParser = require('body-parser');
const {Comment} = require('./models');
const {Post} = require('./models');
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.get('/comment',async(req,res)=>{
    try {
        const comments = await Comment.findAll({
            include : {
                model : Post
            }
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({
            error : error.Message
        })
    }
})
app.get('/Post',async(req,res)=>{
    try {
        const post = await Post.findAll({
            include : {
                model : Comment
            }
        });
        res.status(200).json(post);
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
