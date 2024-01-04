const jwt = require("jsonwebtoken");
const userModel = require("../model/UserModel");
const generateOTP = require("../service/generateOtp");
//create token structure
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

const loginUser = async (req, res) => {
  const user = await userModel.findOne({ mobile_number: req.body.mobile });
  if (!user) {
    const data = await userModel.create({
      mobile_number: req.body.mobile,
      role: req.body.role
    });
    const token = createToken(data._id);
    const role = data.role;
    res.status(200).json({ token, role });
  } else {
    const otp = generateOTP();
    const token = createToken(user._id);
    const role = user.role;
    await userModel.findByIdAndUpdate(
      { _id: user._id },
      { $set: { otp: otp } },
      { new: true }
    );
    res.status(200).json({ token, role });
  }
};

const verifyOtp = async (req, res) => {
  const user = await userModel.findOne({ otp: req.body.otp });
  if (user) {
    await userModel.findByIdAndUpdate(
      { _id: user._id },
      { $set: { otp: "" } },
      { new: true }
    );
    res.status(200).json("Your otp verified");
  } else {
    res.status(404).json("Your otp not found");
  }
};

const fetchUser = async(req,res)=>{
  try {
   const user = await userModel.find({});
   res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const updateStatus = async(req,res)=>{
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        const result =  await userModel.findByIdAndUpdate(
            { _id: user._id },
            { $set: { online: req.body.online } },
            { new: true }
          );
          res.status(200).json({result});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
  loginUser,
  verifyOtp,
  fetchUser,
  updateStatus
};
