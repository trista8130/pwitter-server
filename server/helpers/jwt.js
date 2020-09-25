import jwt from "jsonwebtoken";
import Users from "../models/User";

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization; //Bearer token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      success: false,
      data: "Token is not found",
    });
  }
  try {
    const { userId } = await jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(userId);
    req.user = user; //将user的信息放在req.user里
    next(); //app.js里通过authenticate验证后，继续执行后续的app.use（router）
  } catch (error) {
    return res.json({
      success: false,
      data: error,
    });
  }
};

export default authenticateToken;
