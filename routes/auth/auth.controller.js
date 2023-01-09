const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
      return res.status(403).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    });

    // delete user.dataValues.password;

    res.status(200).json({
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);

      if (checkPassword) {
        // Create a new JSON web token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Set the token as a cookie on the response
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({
          message: "Successfully signed in",
          email: user.email,
          data: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect password",
        });
      }
    } else {
      res.status(403).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
};

module.exports = { signup, signin };