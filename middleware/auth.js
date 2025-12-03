const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = decoded;
    req.userData = user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}


function adminAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);

    if (!decoded.admin) {
      return res.status(403).json({ message: "Not admin" });
    }

    req.admin = true;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authMiddleware,adminAuth  };
