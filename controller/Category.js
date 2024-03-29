const categoryModel = require("../model/categoryModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadcategory = async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "category",
    });
    if (result) {
        const category = new categoryModel(req.body);
       category.category_image_url = result.secure_url
       category.discount_price = Math.round(category.price*(1-category.discount_percentage/100))
       category.premium_discount_price = Math.round(category.price*(1-category.premium_percentage/100))
       
      const doc = await category.save()
      res.status(200).json({ data: doc });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchcategory = async(req,res)=>{
   try {
    const category = await categoryModel.find()
    res.status(200).json({categories: category})
   } catch (error) {
     res.status(500).json(error.message)
   }
}
const fetchCategoryById = async(req,res)=>{
  try {
    const {productId} = req.body;
    const category = await categoryModel.findById({_id: productId})
    res.status(200).json({success: true, category})
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
}

const updatecategory = async(req,res)=>{
  try {
    const data = await categoryModel.findOne({_id: req.params.id });
       await categoryModel.findByIdAndUpdate(
        { _id: data._id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json('Your category has been updated'
        );
  } catch (error) {
    res.status(500).json( error.message )
  }
}

const deletecategory = async(req,res)=>{
  try {
    const { id } = req.params;
    const cat = await categoryModel.findByIdAndDelete(id);
    if (!cat) {
      return res.status(400).json("Category not found");
    }
    res.status(200).send("Category deleted successfully");
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const likeCategory = async(req,res)=>{
  const {userID,productID} = req.body;
  const data = await categoryModel.findOne({_id: productID })
  const result = await data.favorite.includes(userID)
  if(result === true){
   res.status(400).json({success: false, message: "Product Already Favorited"})
  }else{
     await categoryModel.findByIdAndUpdate(
      { _id: data._id },
      { $push: {favorite: userID} },
      { new: true }
    );
    res.status(200).json({success: true, message: "Product Favorite"})
  }
}

const unlikeCategory = async(req,res)=>{
  const {userID,productID} = req.body;
  const data = await categoryModel.findOne({_id: productID});
  const result = await data.favorite.includes(userID)
  if(result === true){
     await categoryModel.findByIdAndUpdate(
      { _id: data._id },
      { $pull: {favorite: userID} },
      { new: true }
    );
    res.status(200).json({success: true, message: "Product removed from favorite"})
  }else{
    res.status(400).json({success: false, message: "Favorite is empty"})
  }
}


module.exports = {
  uploadcategory,
  fetchcategory,
  updatecategory,
  deletecategory,
  fetchCategoryById,
  likeCategory,
  unlikeCategory
};
