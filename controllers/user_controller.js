const mongoose = require("mongoose");
const UploadModel = require("../models/uploads");

exports.CreatePost = (req, res, next) => {
  console.log(req.file);
  console.log(req.body, req.body);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  }
  //new instance of the model to store data
  const uploadModel = new UploadModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    text: req.body.text,
    type: req.body.type,
    image_url: req.file.path,
    userId: req.userData.userId
  });
  uploadModel
    .save()
    .then(result => {
      res.status(201).redirect("/post");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.GetAllPost = (req, res, next) => {
  UploadModel.find()
    .select("_id image_url")
    .exec()
    .then(results => {
      res.status(200).render("views", {
        data: results
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.GetUserPost = (req, res, next) => {
  UploadModel.find()
    .select()
    .exec()
    .then(results => {
      let data = results.filter(result => result.userId == req.userData.userId);
      res.status(200).render("dashboard", {
        data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.GetPostById = (req, res, next) => {
  UploadModel.findOne({ _id: req.params._id })
    .select()
    .exec()
    .then(result => {
      return res.status(200).json({
        success: true,
        message: "Successfully retrieved post",
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.DeletePost = (req, res, next) => {
  UploadModel.deleteOne({ _id: req.params._id })
    .select()
    .exec()
    .then(result => {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted post",
        data: result
      });
    })
    .catch(error => {
      res.status(500).json({
        error: err
      });
    });
};
