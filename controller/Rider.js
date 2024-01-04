const riderModel = require("../model/riderModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

const uploadRider = async (req, res) => {
  try {
  
    if (!req?.files?.riderImage)
      return res.status(400).send("Please upload an image");
    const file = req.files.riderImage;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "image",
      folder: "Riders",
    });

    if (result) {
     console.log(result)
        const rider = new riderModel(req.body);
       rider.rider_image_url = result.secure_url

      const doc = await rider.save()
      res.status(200).json({ data: doc });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchriders = async(req,res)=>{
   try {
    const rider = await riderModel.find()
    res.status(200).json({riders: rider})
   } catch (error) {
     res.status(500).json(error.message)
   }
}

const updaterider = async(req,res)=>{
  try {
    const data = await riderModel.findOne({_id: req.params.id });
       await riderModel.findByIdAndUpdate(
        { _id: data._id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json('Your rider has been updated'
        );
  } catch (error) {
    res.status(500).json( error.message )
  }
}

const deleteRider = async(req,res)=>{
  try {
    const { id } = req.params;
    const data = await riderModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).json("Rider not found");
    }
    res.status(200).send("Rider deleted successfully");
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = {
  uploadRider,
  fetchriders,
  updaterider,
  deleteRider
};
