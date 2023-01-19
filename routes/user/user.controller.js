const User = require("../../models/User");
const jwt = require("jsonwebtoken");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get one user
// const getOneUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const userSelf = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id === id) {
      const user = await User.findById(id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  userSelf,
};
