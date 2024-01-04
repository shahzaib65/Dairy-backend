const cartModel = require('../model/cartModel');

const addCart = async(req,res)=>{
  const cart = new cartModel(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate('Category');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
const fetchCart = async(req,res)=>{
    const { Id } = req.body;
    console.log(Id)
  try {
    const cartItems = await cartModel.find({ user: Id }).populate('category');

    res.status(200).json({carts: cartItems});
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateCart = async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await cartModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const result = await cart.populate('category');
  
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
    deleteFromCart
}