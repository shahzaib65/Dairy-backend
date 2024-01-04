const promotionModel = require("../model/promotionModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadPromotion = async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "prmotions",
    });

    if (result) {
     console.log(result)
        const promotion = new promotionModel(req.body);
       promotion.promotion_image_url = result.secure_url

      const doc = await promotion.save()
      res.status(200).json({ data: doc });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchPromotions = async(req,res)=>{
   try {
    const promotion = await promotionModel.find()
    res.status(200).json({promotions: promotion})
   } catch (error) {
     res.status(500).json(error.message)
   }
}

const updatePromotion = async(req,res)=>{
  try {
    const data = await promotionModel.findOne({_id: req.params.id });
       await promotionModel.findByIdAndUpdate(
        { _id: data._id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json('Your promotion has been updated'
        );
  } catch (error) {
    res.status(500).json( error.message )
  }
}

const deletePrmotion = async(req,res)=>{
  try {
    const { id } = req.params;
    const cat = await promotionModel.findByIdAndDelete(id);
    if (!cat) {
      return res.status(400).json("Prmotion not found");
    }
    res.status(200).send("Prmotion deleted successfully");
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = {
  uploadPromotion,
  fetchPromotions,
  updatePromotion,
  deletePrmotion
};
