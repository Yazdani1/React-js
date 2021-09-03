const express = require("express");
const router = express.Router();
const Data = require("../model/Data");
router.get("/", (req, res) => {
  res.send("Hello nofdsfdsdfde js");
});
router.post("/post", (req, res) => {
  var postData = Data(req.body);
  Data.create(postData)
    .then((data) => {
      res.json({
        posts: data,
        message: "This is for the protfoli",
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/allData", (req, res) => {
  Data.find({})
    .lean()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete

router.delete("/delete/:id", (req, res) => {
  var deleteQuery = { _id: req.params.id };
  Data.findByIdAndDelete(deleteQuery)
    .then((deleteData) => {
      res.json(deleteData);
    })
    .catch((err) => {
      console.log(err);
    });
});

//edit data

router.get("/edit/:id", (req, res) => {
  var editQuery = { _id: req.params.id };
  Data.findOne(editQuery)
    .then((editdata) => {
      res.json(editdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//edit data

router.put("/editData/:id", (req, res) => {
  var editQuery = { _id: req.params.id };

  Data.updateOne(editQuery, {
    $set: {
      title: req.body.title,
      des: req.body.des,
      price: req.body.price
    },
  })
    .then((ddupdate) => {
      res.json(ddupdate);
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
