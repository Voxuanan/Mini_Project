const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

app.get("/", function (req, res) {
    res.send("Hello, world!");
});
app.get("/sendEmail", (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    var content = "";
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>
    `;
    var mainOptions = {
        from: "TestOnline" + "&lt;" + process.env.GMAIL_ACCOUNT + "&gt;",
        to: "logothanlong147@gmail.com",
        subject: "Test Nodemailer",
        html: content, //Nội dung html mình đã tạo trên kia :))
    };
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log("cuu" + err);
            res.redirect("/");
        } else {
            console.log("Message sent: " + info.response);
            res.redirect("/");
        }
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
