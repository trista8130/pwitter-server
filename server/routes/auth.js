import express from "express";
import AuthController from "../controllers/auth";
const router = express.Router();

router.get("/", async (req, res) => {
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  try {
    const data = await AuthController.register(req.body);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const data = await AuthController.handleLogin(req.body);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
});

export default router;
