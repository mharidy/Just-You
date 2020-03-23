const mongoCL = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(bodyParser.json());
const dbName = "just-for-you";
const mongodbURL = "mongodb://localhost:27011/" + dbName;

app.route("/senderUsers")
    .post((req, res) => {
        let body = req.body
        mongoCL.connect(mongodbURL, {useUnifiedTopology: true}, (err, db) => {
            let myDB = db.db()
            myDB.collection("senderUsers").insertOne(body, (e, r) => {
                res.status(201).send("just added to the DB")
            })
        })
    })
    .get((req, res) => {
        mongoCL.connect(mongodbURL, {useUnifiedTopology: true}, (err, db) => {
            let myDB = db.db()
            myDB.collection("senderUsers").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            });
        })
    })


app.route("/receiverUsers")
    .post((req, res) => {
        let body = req.body
        mongoCL.connect(mongodbURL, {useUnifiedTopology: true}, (err, db) => {
            let myDB = db.db()
            myDB.collection("receiverUsers").insertOne(body, (e, r) => {
                res.status(201).send("just added to the DB")
            })
        })
    })
    .get((req, res) => {
        mongoCL.connect(mongodbURL, {useUnifiedTopology: true}, (err, db) => {
            let myDB = db.db()
            myDB.collection("receiverUsers").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            });
        })
    })

app.listen(port, () => {
    console.log("App running on port 8000")
})
