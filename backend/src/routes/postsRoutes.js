import express from "express";
import {
  savePost,
  listPosts,
  uploadImage,
} from "../controllers/postsController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const routes = (app) => {
  app.use(express.json());

  app.get("/posts", listPosts);

  app.post("/posts", savePost);

  app.post("/upload", upload.single("imagem"), uploadImage);

  app.put("/upload/:id");
};

export default routes;
