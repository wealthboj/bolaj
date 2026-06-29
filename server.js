const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}


const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
        cb(null, Date.now() + "-" + file.originalname);
    }

});


const upload = multer({storage});


// upload image
app.post("/upload", upload.single("image"), (req,res)=>{

    res.json({
        message:"Upload successful",
        file:req.file.filename
    });

});


// get images
app.get("/images",(req,res)=>{

    fs.readdir("uploads",(err,files)=>{

        if(err){
            return res.json([]);
        }

        res.json(files);

    });

});


// show images
app.use("/uploads", express.static("uploads"));


app.listen(5000,()=>{

    console.log("Server running on port 5000");

});