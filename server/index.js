const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
