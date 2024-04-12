const express = require('express')
const { Sequelize } = require("sequelize");

const router = express();

const sequelize = new Sequelize('node_orm', 'root', 'Sagar@05', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then((success) => {
    console.log("Connected successfully");
}).catch((error) => {
    console.log("Connection failed: " + error);
});

const User = sequelize.define('tbl_user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email : {
        type:Sequelize.STRING,
    },
    rollNo:{
        type:Sequelize.INTEGER,
    },
    status:{
        type:Sequelize.ENUM("1","0"),
        defaultValue:"1",
    }
},{
    modelName:"User",
});


router.get('/users',async(req,res)=>{
    try {
        const users = await User.findAll();
        res.status(201).json(users); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

router.post('/bulk-user',async(req,res)=>{
    try {
        const user = await User.bulkCreate(req.body);
        res.status(200).json(user); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.put('/user',async(req,res)=>{
    try {
        const user = await User.update({
            name:req.body.name,
            email:req.body.email,
            rollNo:req.body.rollNo,
        },{
            where:{
                id:req.body.id,
            }
        })
        res.status(200).json({
            Message : "updated Successfully"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
})

router.delete('/user/:id',async(req,res)=>{
    try {
        const user = await User.destroy({
            where:{
                id: req.params.id,
            }
        })
        res.status(200).json({
            Message : "deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


//  sql raw query

router.get('/users-raw',async(req,res)=>{
    try{
    const users = await sequelize.query('select * from tbl_users',{
        type:sequelize.QueryTypes.SELECT
    })
    res.status(201).json(users); 
} catch (error) {
    res.status(400).json({ error: error.message }); 
}
})

router.put('/user-update-raw',async(req,res)=>{
    try{
    const users = await sequelize.query('UPDATE tbl_users SET name = "' + req.body.name + '", email = "' + req.body.email + '" WHERE id = ' + req.body.id,{
        type:sequelize.QueryTypes.UPDATE
    })
    res.status(201).json({
        message : "updated succesfully"
    }); 
} catch (error) {
    res.status(400).json({ error: error.message }); 
}
})
router.delete('/user-delete-raw/:id',async(req,res)=>{
    try{
    const users = await sequelize.query('DELETE from tbl_users WHERE id = ' + req.params.id,{
        type:sequelize.QueryTypes.DELETE
    })
    res.status(201).json({
        message : "deleted succesfully"
    }); 
} catch (error) {
    res.status(400).json({ error: error.message }); 
}
})

module.exports = router;