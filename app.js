const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){

    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    var data= {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData= JSON.stringify(data);
 
    const url ="https://us5.api.mailchimp.com/3.0/lists/5f82d24bde";
    const options = {
        method: "POST",
        auth: "manas1:ee7f25cd8549944a5a5b3fed708c6239-us5"
    }

     const url ="https://us5.api.allweather.com/3.0/lists/5f82d24bde";
    const options = {
        method: "GET",
        auth: "hero12:ee7f25cd8549944a5a5b3fed708c6239"
    }

    const request = https.request(url, options ,function(response){

       if (response.statusCode===200){
           res.sendFile(__dirname+"/success.html");
       }
       else{
           res.sendFile(__dirname+"/failure.html");
       }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

     })
     request.write(jsonData);

     request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})
var secret=ee7f25cd8549944a5a5b3fed708c6239-us5;
//API
//ee7f25cd8549944a5a5b3fed708c6239-us5

//list id
//5f82d24bde
