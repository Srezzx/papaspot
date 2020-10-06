const express = require("express");
const router = express.Router();
const Article = require("../models/articles");

router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    return res.render("articles/articles", { articles: articles });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error occured!");
  }
});

router.get("/articles/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article) {
      // console.log(article);
      res.render("articles/single-article", {article});
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (err) {
    res.status(500).send("Server error!");
  }
});

router.post("/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    return res.redirect("/articles");
  } catch (err) {
    console.log(err.message);
    res.redirect("/articles");
  }
});

router.get("/add-articles", (req, res) => {
  res.render("articles/new-article");
});

router.post("/add-articles", async (req, res) => {
  const { title, desc, imageUrl, content } = req.body;
  const newArticle = new Article({
    title,
    desc,
    imageUrl,
    content,
  });

  try {
    await newArticle.save();
    return res.redirect("/articles");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error occured!");
  }
});

module.exports = router;
