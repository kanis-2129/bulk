const express = require("express")

const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/passkey").then(function () {
    console.log("db connected")
})

// model use panni db collection edukanu
// schema collection new update panradhuku
const credentialSchema = new mongoose.Schema({
    user: String,
    pass: String
});

const credential = mongoose.model("credential", credentialSchema, "bulkmail");

// //  Add this temporarily
//   credential.insertMany([
//    {
//         user: "kaniskaasinathan@gmail.com",
//          pass: "quyl omru hslr eacw" // your real Gmail app password here
//      }
//  ])
//.then(() => console.log(" Credentials inserted"))
//      .catch(err => console.log(" Insert failed", err));

app.post("/sendmail", function (req, res) {
    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then(function (data) {
     
        //  [console.log(data[0].toJson())...to json a convert pannadha data[0 array object ah use pannala
        const transporter = nodemailer.createTransport({
            service: "gmail",

            // true for 465, false for other ports

            auth: {
                user: data[0]?.user,
                pass: data[0]?.pass,
            },

        });

        new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < emailList.length; i++) {
                    await transporter.sendMail(
                        {
                            from: "kaniskasinathan@gmail.com",
                            to: emailList[i],
                            subject: "Message bulkMail",
                            text: msg

                        }
                    )

                    console.log("email send:" + emailList[i])
                }

                resolve("successs")

            }

            catch (error) {
                reject(error)
            }
        }).then(function () {
            res.json(true)
        }).catch(function (error) {
            console.log(" Email sending error:", error);
            return res.json(false)
        })

    })
        .catch(function (error) {
            console.log(error)
        })


}



)


app.listen(5000, function () {
    console.log("Server started")
})