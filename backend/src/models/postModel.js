import connectDatabase from "../config/dbconfig.js";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true },
    imgUrl: { type: String, required: true, unique: true },
    alt: { type: String, required: true },
  },
  { timestamps: true }
);

// const Post = mongoose.model("Post", postSchema);
// export default Post;

const connection = await connectDatabase(process.env.CONNECTION_STRING);

export async function getAllPosts() {
  const db = connection.db("imersao_alura");
  const postsCollection = db.collection("posts_collection");
  return postsCollection.find().toArray();
}

export async function createPost(newPost) {
  const db = connection.db("imersao_alura");
  const colecao = db.collection("posts_collection");
  return colecao.insertOne(newPost);
}

export async function updatePost(id, newPost) {
  const db = conexao.db("imersao_alura");
  const colecao = db.collection("posts_collection");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}
