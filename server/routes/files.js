import express from "express";
import multer from "multer";
import Users from "../models/User";

import aws from "aws-sdk";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "pwitter-images",
    key: function (req, file, callback) {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 100000);
      callback(null, `${uniqueName}.${file.mimetype.split("/")[1]}`);
    },
  }),
});

//上传进本地
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, __dirname + "../../../avatar/");
//   },
//   filename: function (req, file, callback) {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 100000);
//     callback(null, `${uniqueName}.${file.mimetype.split("/")[1]}`);
//   },
// });

const router = express.Router();

router.post(
  "/images",
  upload.single("files"),
  // multer({ storage, limits: { fileSize: 5000 } }).single("avatar"), 本地上传
  async (req, res) => {
    const { userId } = req.query;
    // console.log(req.file.filename);
    try {
      // const user = await Users.findByIdAndUpdate(
      //   userId,
      //   {
      //     $set: {
      //       avatar: req.file.location,
      //     },
      //   },
      //   { new: true }
      // );
      // res.json({
      //   successs: true,
      //   data: user,
      // });
      res.json({
        success: true,
        data: req.file.location,
      });
    } catch (error) {
      res.json({
        success: false,
        data: error,
      });
    }
  }
);

export default router;
