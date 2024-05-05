const User = require("../modals/user")
const Category = require("../modals/category")
const Product = require("../modals/product")

const demo = async (req,res)=>{
    const {userId,username,email,password,phoneNumber} = req.body;
    if(!userId||!username||!email||!password||!phoneNumber){
        console.log("please enter bla bla bla");
    }
    try{
        const user = await User.create(req.body)
        res.json({user,msg:"successfull"})
    }
    catch(err){
        res.status(400).json({err:err});
    }
    // console.log(req.body);
   
}

const insert = async (req,res)=>{
    const {productId,name,description,price,quantityAvailable,categoryId,sellerId,subCategory,imageUrl} = req.body;
    if(!productId||!name||!description||!price||!quantityAvailable||!categoryId||!sellerId||!subCategory||!imageUrl){
        console.log("please enter bla bla");
    }
    try{
        const product =  await Product.create(req.body)
        res.json({product,msg:"successfull"})
    }catch(err){
        res.status(400).json({err:err});
    }
}

const start = (req, res) => {

    console.log('Starting the process...');
    res.send('Process completed successfully!');
};

module.exports = {demo,start,insert}