const express = require("express");
const routes = express.Router();

const Url = require("../models/Url");

routes.get("/", (req, res) => {
    res.render("index");
});

routes.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json("No url found");
        }
    } catch (error) {
        res.status(500).json("Sever error");
    }
});
module.exports = routes;
