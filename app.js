
// // Api key
// // 15ba46b0554566260192a6f0f0956d5e-us13

// // List ID
// // f7a23e906a
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({

    apiKey: "15ba46b0554566260192a6f0f0956d5e-us13",
    server: "us13"

});

app.post("/", function (req, res) {

    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;

    const listId = "f7a23e906a";

    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email 
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {

            email_address: subscribingUser.email,
            status: "subscribed",

            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

        res.sendFile(__dirname + "/success.html")

        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    }


    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})