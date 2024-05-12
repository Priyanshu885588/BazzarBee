const Product = require("../modals/product");
const FashionProduct = require("../modals/fashionProduct");

const getBeautyProducts = async (req, res) => {
  try {
    const product = await Product.find({
      categoryId: "7090ff7e6cd12715e033e4e8",
    });
    if (product.length === 0) {
      return res
        .status(200)
        .json({ msg: "No products available", product: product });
    }
    res
      .status(200)
      .json({ msg: "products found successfully", product: product });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const getElectronicProduct = async (req, res) => {
  try {
    const product = await Product.find({
      categoryId: "6090ff7e6cd12715e033e4f9",
    });
    if (product.length === 0) {
      return res
        .status(200)
        .json({ msg: "No products available", product: product });
    }
    res
      .status(200)
      .json({ msg: "products found successfully", product: product });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const getFashonProduct = async (req, res) => {
  try {
    const product = await Product.find({
      categoryId: "6090ff7e6cd12715e033e4e8",
    });
    if (product.length === 0) {
      return res
        .status(200)
        .json({ msg: "No products available", product: product });
    }
    res
      .status(200)
      .json({ msg: "products found successfully", product: product });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const getHomeProduct = async (req, res) => {
  try {
    const product = await Product.find({
      categoryId: "8090ff7e6cd12715e033e4e8",
    });
    if (product.length === 0) {
      return res
        .status(200)
        .json({ msg: "No products available", product: product });
    }
    res
      .status(200)
      .json({ msg: "products found successfully", product: product });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const addRating = async (req, res) => {
  const { productId, noOfStars } = req.body;
  if (!productId || !noOfStars) {
    return res.status(400).json({
      msg: "ProductId and number of stars given by the user is required",
    });
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

    const sum = product.ratings.reduce(
      (total, rating, index) => total + rating * (index + 1),
      0
    );
    const averageRating =
      sum / product.ratings.reduce((total, rating) => total + rating, 0);

    product.averageRating = averageRating;
    await product.save();

    res.status(200).json({ msg: "Rating added successfully", product });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const getAllMensFashionProducts = async (req, res) => {
  try {
    const products = await FashionProduct.find({
      category: { $in: ["Men's Accessories", "Men's clothing"] },
    });
    res.json({ products: products, msg: "successfull" });
  } catch (error) {
    res.status(400).json({ message: "unable to fetch data" });
  }
};

const getAllWomensFashionProducts = async (req, res) => {
  try {
    const products = await FashionProduct.find({
      category: { $in: ["Women's Accessories", "Women's Clothing"] },
    });
    res.json({ products: products, msg: "successfull" });
  } catch (error) {
    res.status(400).json({ message: "unable to fetch data" });
  }
};

const filterDataMensClothing = async (req, res) => {
  try {
    const menClothing = await FashionProduct.find({
      category: { $in: ["Men's Accessories", "Men's clothing"] },
    });
    const brands = new Set(); // Use Set for unique values
    const subcategories = new Set();
    const colors = new Set();
    let highestPrice = 0;
    let lowestPrice = 10000000;

    for (const product of menClothing) {
      brands.add(product.brandName);
      subcategories.add(product.subCategory);
      colors.add(product.color);
      highestPrice = Math.max(highestPrice, product.price);
      lowestPrice = Math.min(lowestPrice, product.price);
    }
    res.status(200).json({
      brands: Array.from(brands),
      subcategories: Array.from(subcategories),
      colors: Array.from(colors),
      highestPrice,
      lowestPrice,
      //   allSizes: Array.from(allSizes),
    });
  } catch (error) {
    res.status(400).json({ message: "unable to fetch data" });
  }
};

const filterProducts = async (req, res) => {
  const subCategory = req.query.subCategory
    ? req.query.subCategory.split(",")
    : [];
  const brands = req.query.brands ? req.query.brands.split(",") : [];
  const colors = req.query.colors ? req.query.colors.split(",") : [];
  const priceRange = req.query.priceRange || "";
  try {
    const filter = {};
    filter.category = { $in: ["Men's Accessories", "Men's clothing"] };
    if (subCategory.length > 0) filter.subCategory = { $in: subCategory };
    if (brands.length > 0) filter.brandName = { $in: brands };
    if (colors.length > 0) {
      const colorRegex = colors.map((color) => new RegExp(color, "i"));
      filter.color = { $in: colorRegex };
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      if (minPrice && maxPrice) {
        filter.price = {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        };
      } else if (minPrice) {
        filter.price = { $gte: parseFloat(minPrice) };
      } else if (maxPrice) {
        filter.price = { $lte: parseFloat(maxPrice) };
      }
    }
    const products = await FashionProduct.find(filter);
    res.json({ products: products, msg: "products found successfully!!!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleProduct = async (req,res)=>{
  const {Id} = req.query;
  if(!Id){
    return res.status(400).json({
      msg: "ProductId is required",
    });
  }
  try {
    const product = await FashionProduct.find({_id:Id})
    res.json({ product: product, msg: "product found successfully!!!" });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
}

module.exports = {
  getBeautyProducts,
  getElectronicProduct,
  getFashonProduct,
  getHomeProduct,
  addRating,
  getAllMensFashionProducts,
  getAllWomensFashionProducts,
  filterDataMensClothing,
  filterProducts,
  getSingleProduct,
};
