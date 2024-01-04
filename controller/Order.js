const orderModel = require("../model/orderModel")
const  categoryModel  = require("../model/categoryModel");


const createOrder = async (req, res) => {
    const order = new orderModel(req.body);
    for(let item of order.items){
       let category =  await categoryModel.findOne({_id: item})
       console.log(category)
       category.$inc('stock',-1*category.stock);
       // for optimum performance we should make inventory outside of product.
       await category.save()
    }

    try {
      const doc = await order.save();
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  const fetchOrder = async(req,res)=>{
   try {
    
   const result = await orderModel.find({user: req.params.id})
   req.status(200).json(result)

   } catch (error) {
    res.status(500).json(error.message)
   }
  };

 const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await orderModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
    const order = await orderModel.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

  module.exports = {
    createOrder,
    fetchOrder,
    updateOrder,
    deleteOrder

  }