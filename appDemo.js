const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
 
 
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
mailchimp.setConfig({
  apiKey: '15ba46b0554566260192a6f0f0956d5e-us13',
  server: 'us13',
});
 
 
 
 
 
 
const app = express()
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
  })
 
app.post("/", function(req, res) {
 
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email =req.body.email
 
  
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers("55976ca3e0", {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
 
      }],
    });
    console.log(response);
  };
  
  run();
  
 
})
 
 
 
app.listen(3000, function() {
    console.log("server started")    
})