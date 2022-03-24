const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        callback(null, uuidv4() + path.extname(file.originalname));
    },
});

const checkFileType = (file, callback) => {
    const filetypes = /jpeg|png|jpg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback("Error: Image Only!", false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback);
    },
}).single("imageUpload");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render("index", { msg: err });
        } else {
            // console.log(req.file);
            if (req.file == undefined) {
                res.render("index", { msg: "Error: no file selected!" });
            }
            res.render("index", {
                msg: "File uploaded!",
                file: `uploads/${req.file.filename}`,
            });
        }
    });
});

app.listen(port, () => console.log(`Server listening on port: http://localhost:${port}`));
