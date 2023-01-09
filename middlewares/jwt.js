const jwt = require("jsonwebtoken");
const User = require("../models/User");

//create auth based on role
const auth = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

//create auth middleware based on role user model
const authRole = (roles) => {
  return (req, res, next) => {
    // Cek apakah request memiliki header 'authorization'
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // Ambil token dari header
    const token = authorizationHeader.split(" ")[1];
    // Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      // Cari user berdasarkan ID yang ada di token
      User.findById(decoded.id, (error, user) => {
        if (error || !user) {
          return res.status(401).send({ message: "Unauthorized" });
        }
        // Cek apakah role pengguna ada di daftar role yang diizinkan
        if (roles.indexOf(user.role) > -1) {
          // Tambahkan user ke request sehingga route yang menggunakan middleware ini
          // dapat mengakses informasi user
          req.user = user;
          next();
          return;
        }
        // Jika tidak, kembalikan respons tidak diizinkan
        return res.status(403).json({ message: "Forbidden" });
      });
    });
  };
};
// export auth
module.exports = { auth, authRole };
