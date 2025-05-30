// middleware/authenticateUser.js
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "default_secret");

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userId = decoded.id;
    req.user = user; // optional
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
