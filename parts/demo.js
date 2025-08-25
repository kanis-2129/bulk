const express = require("express")
const cors = express("cors")

const app = express()

app.use(express.json())

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",

    // true for 465, false for other ports
    auth: {
        user: "kaniswarik@gmail.com",
        pass: "wmlb qiww ekjg doks",
    },
});
app.get("/sendmail", function (req, res) {
    transporter.sendMail(
        {
            from: "kaniswarik@gmail.com",
            to: "jomigo5059@exitbit.com",
            subject: "Message bulkMail",
            text: "How are you?"

        },
        function (error, info) {
            if (error) {
                console.log(error)
                res.send("error")
            }
            else {
                console.log(info)
                res.send("success")
            }
        })



}
)


app.listen(5000, function () {
    console.log("Server started")
})