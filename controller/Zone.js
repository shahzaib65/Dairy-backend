const zoneModel = require("../model/zoneModel");

const uploadZone = async(req,res)=>{
 try {

    const zone = new zoneModel(req.body);
    const doc = await zone.save();
    res.status(200).json(doc);
    
 } catch (error) {
    res.status(500).json(error.message)
 }
};
const fetchZone = async(req,res)=>{
    try {
        
    const data = await zoneModel.find({});
    res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error.message)
    }
};
const updateZone = async(req,res)=>{
    try {
        const zone = await zoneModel.findOne({ _id: req.params.id });
        const result =  await zoneModel.findByIdAndUpdate(
            { _id: zone._id },
            { $set: req.body},
            { new: true }
          );
          res.status(200).json({result});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteZone = async (req, res) => {
    const { id } = req.params;
    try {
    const zone = await zoneModel.findByIdAndDelete(id);
    res.status(200).json(zone);
  } catch (err) {
    res.status(400).json(err.message);
  }
};



module.exports = {
    uploadZone,
    fetchZone,
    updateZone,
    deleteZone
}