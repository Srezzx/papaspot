var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require("passport");

//MODELS
var Admin = require("../models/admin");
var Places = require("../models/places");
var Comments = require("../models/comments");
var userEntry = require("../models/userentry");
var Faqs = require("../models/faq");
var Articles = require("../models/articles");



router.get("/atlas/app/places/restaurants", async (req,res) =>{
    console.log(req.body);
    var places = await Places.find({type:"restaurant"});
    try
    {
        return res.json({msg:"Success", places:places, error:"No error found"});
    }
    catch(err)
    {
        return res.json({msg:"Failed", places:"No places found", error:err})
    }
});

router.get("/atlas/app/places/utilities", async (req,res) =>{
    console.log(req.body);
    var places = await Places.find({type:"utilities"});
    try
    {
        return res.json({msg:"Success", places:places, error:"No error found"});
    }
    catch(err)
    {
        return res.json({msg:"Failed", places:"No places found", error:err})
    }
});

router.get("/atlas/app/places/hangouts", async (req,res) =>{
    console.log(req.body);
    var places = await Places.find({type:"hangouts"});
    try
    {
        return res.json({msg:"Success", places:places, error:"No error found"});
    }
    catch(err)
    {
        return res.json({msg:"Failed", places:"No places found", error:err})
    }
});

router.get("/atlas/app/articles", async(req,res) => {
    console.log(req.body);
    var articles = await Articles.find({});
    try
    {
        return res.json({msg:"Success", error:"No Error found", articles:articles});
    }
    catch(err)
    {
        return res.json({msg:"Failed", error:err, articles:"Failed to get the articles"});
    }
});

router.get("/atlas/app/all_faqs", async(req,res) => {
    console.log(req.body);
    var faqs = await Faqs.find({});
    try
    {
        return res.json({msg:"Success" , error:"No errors found", faqs:faqs});
    }
    catch(err)
    {
        return res.json({msg:"Failed" , error:err, faqs:"No Faqs found"});
    }
})


module.exports = router;