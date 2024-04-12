const express = require('express');
const { product } = require('../models'); // Assuming your model file exports Product
const Sequelize = require('sequelize');

const op = Sequelize.Op;

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        // console.log(productModel)
        console.log("hello");
        const products = await product.findAll({
           attributes : ["id","name"],
        //    limit:10,
        //    offset:5,
           order:[["id" , "DESC"]],
           where : {
            //  id: {
            //     // [op.gt] :316
            //     [op.between] : [300,400]     
            //  },    // and 
            //  name:{
            //     [op.like] : 'P%',
            //     [op.like] : '%Car%'   // and operation   
            //  }
            //  id : {
            //     [op.or] : {
            //         [op.gte] : 322,
            //         [op.lt] : 400
            //     }
            //  }
            [op.or]:{
                id : 322,
                name : {
                    [op.like] : 'p%'
                }
            }
           }

        });
        console.log("hello");
        res.status(200).json(products   );
    } catch (error) {
        console.error(error);
        res.status(400).json({
            Message: error.message // 'message' should be lowercase
        });
    }
});

module.exports = router;
