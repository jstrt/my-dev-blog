const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const postsRouter = require("./routes/posts");
const commentRoutes = require("./routes/comments");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devblog",
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/posts", async (req, res) => {
  const { title, body, language } = req.body;

  try {
    const newPost = new Post({ title, body, language });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
