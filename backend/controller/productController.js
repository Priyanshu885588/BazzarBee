const Product = require("../modals/product")

const getBeautyProducts = async (req,res)=>{
    try{
        const product = await Product.find({categoryId:"7090ff7e6cd12715e033e4e8"});
        if(product.length === 0){
            return res.status(200).json({msg:"No products available",product:product})
        }
        res.status(200).json({msg:"products found successfully",product:product})
    }catch(err){
        res.status(400).json({err:err});
    }
}

const getElectronicProduct = async (req,res)=>{
    try{
        const product = await Product.find({categoryId:"6090ff7e6cd12715e033e4f9"});
        if(product.length === 0){
            return res.status(200).json({msg:"No products available",product:product})
        }
        res.status(200).json({msg:"products found successfully",product:product})
    }catch(err){
        res.status(400).json({err:err});
    }
}

const getFashonProduct = async (req,res)=>{
    try{
        const product = await Product.find({categoryId:"6090ff7e6cd12715e033e4e8"});
        if(product.length === 0){
            return res.status(200).json({msg:"No products available",product:product})
        }
        res.status(200).json({msg:"products found successfully",product:product})
    }catch(err){
        res.status(400).json({err:err});
    }
}

const getHomeProduct = async (req,res)=>{
    try{
        const product = await Product.find({categoryId:"8090ff7e6cd12715e033e4e8"});
        if(product.length === 0){
            return res.status(200).json({msg:"No products available",product:product})
        }
        res.status(200).json({msg:"products found successfully",product:product})
    }catch(err){
        res.status(400).json({err:err});
    }
}





module.exports = {getBeautyProducts,getElectronicProduct,getFashonProduct,getHomeProduct}