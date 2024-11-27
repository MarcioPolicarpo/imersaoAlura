import { getAllPosts, createPost, updatePost } from "../models/postModel.js";
import fs from "fs";
import generateDescription from "../services/geminiService.js";

export async function listPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function savePost(req, res) {
  const newPost = req.body;
  try {
    const createdPost = await createPost(newPost);
    res.status(200).json(createdPost);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const createdPost = await createPost(newPost);
    const imageFile = `uploads/${createdPost.insertedId}.png`;
    fs.renameSync(req.file.path, imageFile);
    res.status(200).json(createdPost);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const imageUrl = `http://localhost:3000/${id}.png`;
  const post = {
    imgUrl: imageUrl,
    descricao: req.body.descricao,
    alt: req.body.alt,
  };

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    post.descricao = await generateDescription(imgBuffer);
    const createdCriado = await updatePost(id, post);
    res.status(200).json(createdCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
