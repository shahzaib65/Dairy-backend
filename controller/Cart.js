const cartModel = require('../model/cartModel');
const categoryModel = require('../model/categoryModel');

const addCart = async(req,res)=>{
  try {
    const data = await cartModel.findOne({productId: req.body.productId })
    const productData = await categoryModel.findOne({_id: req.body.productId})
   if(data === null){
    const cart = new cartModel(req.body);
    await cart.save();
    res.status(200).json({success: true,message: "Product Cart"});
   }else{
     if(req.body.quantity < productData.cartQuantity){
     await cartModel.findByIdAndUpdate(
        { _id: data._id },
        { $set:{quantity: req.body.quantity}},
        { new: true }
      );
      res.status(200).json({success: true, message: "Product Cart"})
     }
     else{
       res.status(400).json({success: false, message: "You reached the limit"})
     }
   }
  } catch (err) {
    res.status(500).json({success: false,message: err.message});
  }
};

const subCart = async(req,res)=>{
  try {
    const data = await cartModel.findOne({productId: req.body.productId })
    if(data !== null){
      if(req.body.quantity>0){
           await cartModel.findByIdAndUpdate(
          { _id: data._id },
          { $set:{quantity: req.body.quantity}},
          { new: true }
        );
        res.status(200).json({success: true, message: "Product Updated from the cart"})
     
      }else{
        await cartModel.findByIdAndDelete({_id: data._id});
        res.status(400).json({success: false, message: "Your cart does not exist"})
      }
    }else{
      res.status(400).json({success: false,message:"Data not found"})
    }
  } catch (error) {
    res.status(500).json({success: false,message: error.message})
  }
}

const fetchCart = async(req,res)=>{
    const { userID } = req.body;
  try {
    const cartItems = await cartModel.find({ userId: userID }).populate([{path: 'productId'}]);
    res.status(200).json({success: true,carts: cartItems});
  } catch (err) {
    res.status(500).json({success: false,message:err.message});
  }
};

const updateCart = async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await cartModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const result = await cart.populate('cart');
  
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
    const doc = await cartModel.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports ={
    addCart,
    fetchCart,
    updateCart,
    deleteFromCart,
    subCart
}