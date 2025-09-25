import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, Authentication failed" });
    }

 
    const token = authHeader.split(" ")[1]; // after "Bearer"


    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

   
    req.user = {
      id: decoded.id,
      tenant: decoded.tenant,
      role: decoded.role,
    };
    if (!req.user) {
      return res.status(401).json({ msg: "User not found, Authentication failed" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Authentication failed" });
  }
};

export default auth;
