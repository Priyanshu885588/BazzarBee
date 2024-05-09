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

const addRating = async (req,res)=>{
    const {productId,noOfStars} = req.body
    if(!productId||!noOfStars){
        return res.status(400).json({msg:"ProductId and number of stars given by the user is required"})
    }
    try {
        const product = await Product.findOneAndUpdate(
            { productId: productId },
            { $inc: { [`ratings.${noOfStars - 1}`]: 1 } }, 
            { new: true } 
        );
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const sum = product.ratings.reduce((total, rating, index) => total + rating * (index + 1), 0);
        const averageRating = sum / product.ratings.reduce((total, rating) => total + rating, 0);

        product.averageRating = averageRating;
        await product.save();

        res.status(200).json({ msg: "Rating added successfully", product });
    } catch (error) {
        res.status(400).json({err:error});
    }
}





module.exports = {getBeautyProducts,getElectronicProduct,getFashonProduct,getHomeProduct,addRating}