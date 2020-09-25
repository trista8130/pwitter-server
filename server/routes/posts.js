import express from "express";
import PostController from "../controllers/posts";
import paginate from "../helpers/paginate";
import Posts from "../models/Post";

const router = express.Router();

/* GET users listing. */
router.get("/fetch", async (req, res) => {
  try {
    const result = await PostController.getAllPosts(req.query);
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
    const result = await PostController.createPost(req.body);
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
    const result = await PostController.findPostById(req.query);
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

router.get("/find/byUser", async (req, res) => {
  const { page } = req.query;
  try {
    const result = await PostController.findPostByUser(req.query);
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
router.get("/find/byFriends", async (req, res) => {
  try {
    const { page } = req.query;
    const result = await PostController.findPostByFriends(req.query);
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

router.post("/comment/create", async (req, res) => {
  try {
    const result = await PostController.createCommentInAPost(req.body);
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
  const { postId } = req.body;
  try {
    const result = await Posts.findByIdAndDelete(postId);
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

router.post("/comment/like", async (req, res) => {
  try {
    const result = await PostController.likeAComment(req.body);
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
router.post("/comment/unlike", async (req, res) => {
  try {
    const result = await PostController.unLikeAComment(req.body);
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

router.post("/like", async (req, res) => {
  try {
    const result = await PostController.likeAPost(req.body);
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
router.post("/unlike", async (req, res) => {
  try {
    const result = await PostController.unLikeAPost(req.body);
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
router.post("/report", async (req, res) => {
  try {
    const result = await PostController.reportAPost(req.body);
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
router.post("/unreport", async (req, res) => {
  try {
    const result = await PostController.unReportAPost(req.body);
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
export default router;
