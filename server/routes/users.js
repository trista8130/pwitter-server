import express from "express";
import UserController from "../controllers/users";
import paginate from "../helpers/paginate";
import Users from "../models/User";

const router = express.Router();

/* GET users listing. */
router.get("/fetch", async (req, res) => {
  try {
    const result = await UserController.getAllUsers(req.body);
    res.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});
router.post("/current", async (req, res) => {
  try {
    const result = await Users.findById(req.user._id);
    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.get("/find/byId", async (req, res) => {
  try {
    const result = await UserController.findUserById(req.query);
    res.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});
router.post("/create", async (req, res) => {
  try {
    const result = await UserController.createUser(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await UserController.removeUserById(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.put("/update", async (req, res) => {
  try {
    const result = await UserController.profileUpdate(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.post("/friends/add", async (req, res) => {
  try {
    const resultUser = await UserController.createFriendship(req.body);
    const resultFriend = await UserController.createFriendshipByF(req.body);
    res.json({
      success: true,
      data: [resultUser, resultFriend],
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.post("/friends/remove", async (req, res) => {
  try {
    const resultUser = await UserController.removeFriendship(req.body);
    const resultFriend = await UserController.removeFriendshipByF(req.body);
    res.json({
      success: true,
      data: [resultUser, resultFriend],
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.get("/friends/byId", async (req, res) => {
  try {
    const { page } = req.query;
    const result = await UserController.findFriendsByUserId(req.query);
    const newResult = paginate(result.friends, page);

    res.json({
      success: true,
      data: newResult,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

router.get("/strangers/byId", async (req, res) => {
  try {
    const { page } = req.query;
    const result = await UserController.findStrangersByUserId(req.query);
    const newResult = paginate(result, page);
    res.json({
      success: true,
      data: newResult,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

export default router;
