const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

articleSchema.pre("validate", function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    // console.log(this.slug);
  }
  if(this.content) {
    // console.log(marked(this.content));
    this.sanitizedHtml = dompurify.sanitize(marked(this.content));
  }

  next()
});

module.exports = mongoose.model("articles", articleSchema);
