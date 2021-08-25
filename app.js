const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
  const firstname = req.body.fname;
  const secondname = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[{
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: secondname
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = " https://us5.api.mailchimp.com/3.0/lists/12c4d05198";

  const options = {
    method: "POST",
    auth: "karthik:e250dccb3aa165362d92c0d418549341-us5"
  }

  const request = https.request(url, options, function(response){


if (response.statusCode === 200){
  res.sendFile(__dirname + "/sucess.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || port, () => {
  console.log("running sucessfully");
});


// APIKEY

// listid
