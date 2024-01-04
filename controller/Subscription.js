const subscriptionModel = require('../model/subscriptionModel');
const addSubscription = async(req,res)=>{
try {
   const subscription = new subscriptionModel(req.body);
   var today = new Date();
   var priorDate = new Date(new Date().setDate(today.getDate() + 30));
   subscription.valid_till = priorDate
   res.status(200).json({subscription: subscription})  
} catch (error) {
    res.status(500).json(error.message)
}
};
const fetchSubscription = async(req,res)=>{
    try {
        
 const data = await subscriptionModel.find({userId: req.params.id})
  res.status(200).json({subscriptions: data})
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const updateSubscription = async(req,res)=>{
    try {
      const data = await subscriptionModel.findOne({_id: req.params.id });
         await subscriptionModel.findByIdAndUpdate(
          { _id: data._id },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json('Your subscription has been updated'
          );
    } catch (error) {
      res.status(500).json( error.message )
    }
  }
  
  const deleteSubscription = async(req,res)=>{
    try {
      const { id } = req.params;
      const cat = await subscriptionModel.findByIdAndDelete(id);
      if (!cat) {
        return res.status(400).json("Subscription not found");
      }
      res.status(200).send("Subscription deleted successfully");
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

module.exports = {
    addSubscription,
    fetchSubscription,
    updateSubscription,
    deleteSubscription
}