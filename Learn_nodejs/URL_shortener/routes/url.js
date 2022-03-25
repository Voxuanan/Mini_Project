const express = require("express");
const routes = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv").config();

const Url = require("../models/Url");

routes.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;
    console.log(req.body);

    if (!validUrl.isUri(baseUrl)) {
        res.status(401).json("Invalid base Url");
    }

    const urlCode = shortid.generate();
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.render("index", { url });
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date(),
                });
                url.save();
                res.render("index", { url });
            }
        } catch (error) {
            res.status(500).json("Sever error");
        }
    } else {
        res.status(401).json("Invalid long url");
    }
});

module.exports = routes;
