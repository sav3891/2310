const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);

    //cb(null,file.originalname);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));


let validateToken=(req,res,next)=>{
  console.log("inside validate token");
  console.log(req.headers.Authorization);
  console.log("inside validate token");
  next();
}
app.use(validateToken);

let signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let user = new mongoose.model("user", signupSchema);

app.put("/deleteProfile", upload.none(), async (req, res) => {
  try {
    await user.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "user deleted succesfully" });
  } catch (err) {
    res.json({ status: "failue", msg: "not able to delete" });
  }
});

app.put("/updateProfile", upload.single("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.fn.length > 0) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { firstName: req.body.fn }
      );
      console.log(updatedDetailsStatus);
    }

    if (req.body.ln.length > 0) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { lastName: req.body.ln }
      );
    }

    if (req.body.age.length > 0) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { age: req.body.age }
      );
    }

    if (req.body.mobileNo.length > 0) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { mobileNo: req.body.mobileNo }
      );
    }

    if (req.body.password.length > 0) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }

    if (req.file) {
      let updatedDetailsStatus = await user.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }

    res.json({ status: "success", msg: "user deatisl updated successfully" });
  } catch (err) {
    res.json({
      status: "failure",
      msg: "user deatils unable to update",
      err: err,
    });
  }
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await user.find().and({ email: req.body.email });
  console.log(userDetails);

  if (userDetails.length > 0) {
    let isPasswordValid = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );
    if (isPasswordValid === true) {
      let token = jwt.sign(
        { email: req.body.email, password: userDetails[0].password },
        "Zumbornjakih"
      );
      let dataObj = {
        age: userDetails[0].age,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
        mobileNo: userDetails[0].mobileNo,
        token: token,
      };
      res.json({ status: "success", data: dataObj });
    } else {
      res.json({ status: "failure", msg: "invalid password" });
    }
  } else {
    res.json({ status: "failure", msg: "user doesnt exist" });
  }

  //res.json(["dummmmy data"])
});

app.post("/loginWithToken", upload.none(), async (req, res) => {
  let receivedToken = req.body.token;
  let decryptedTokenObj = jwt.verify(receivedToken, "Zumbornjakih");

  try {
    decryptedTokenObj = jwt.verify(receivedToken, "Zumbornjakih");
  } catch (err) {
    res.json({ status: "failure", msg: "invalid token", err: err });
  }

  let userDetails = await user.find().and({ email: decryptedTokenObj.email });

  if (userDetails.length >= 0) {
    if (userDetails[0].password == decryptedTokenObj.password) {
      let dataObj = {
        age: userDetails[0].age,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
        mobileNo: userDetails[0].mobileNo,
      };
      res.json({ status: "success", data: dataObj });
    }
  } else {
    res.json({ status: "failure", msg: "invalid token" });
  }
  //res.json({ status: "failure", msg: "invalid token" });

  console.log(decryptedTokenObj);
});

app.post("/signup", upload.array("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let signupuser = new user({
      firstName: req.body.fn,
      lastName: req.body.ln,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.files[0].path,
    });
    await user.insertMany([signupuser]);

    res.json({ status: "succes", msg: "user created succesfully" });
  } catch (err) {
    console.log("unable to insert into mdb");
    console.log(err);
  }

  //res.json("dummy data")
});

//app.listen(process.env.port, () => {
//console.log(`listenin to port ${process.env.port} `);
//});

app.listen(7865, () => {
  console.log("listening to port 7865");
});

let connectToMDB = async () => {
  try {
    //mongoose.connect("mongodb://localhost:27017/1stproject");

    mongoose.connect(
      "mongodb+srv://ZsreEni59vaazzz:J2lYg058VHC1m4gm@cluster0.xuppfcs.mongodb.net/1stproject?retryWrites=true&w=majority"
    );
    //  mongoose.connect(
    //   process.env.mdburl
    //);

    console.log("successfully connected MDB");
  } catch (err) {
    console.log("unable to connect mdb");
    console.log(err);
  }
};
connectToMDB();
