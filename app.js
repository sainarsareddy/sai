
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const encrypt = require("mongoose-encryption");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin:test123@cluster0.tqelawx.mongodb.net/digilockerDB");
const CredentialSchema = new mongoose.Schema({
  Username : String,
  password : String,
  img:
  {
    data: Buffer,
    contentType: String
  }
})




const secret = "Thisisoursecret";
CredentialSchema.plugin(encrypt,{secret:secret,encryptedFeilds : ["password"]});
const Credentials = mongoose.model("Credentials",CredentialSchema);



app.get("/", function(req, res) {

  res.render("index");

});
app.get("/signup.ejs", function(req, res) {

  res.render("signup");

});
app.get("/about.ejs", function(req, res) {

  res.render("about");

});
app.get("/services.ejs", function(req, res) {

  res.render("services");

});
app.post("/signup.ejs", function(req,res){
  const enteredusername = req.body.username;
  const enteredpassword = req.body.password;
  console.log(enteredusername);
  console.log(enteredpassword);
  const cred2  = new Credentials({
    Username : "saireddy",
    password : "sai_33333",
    marksheet : "https://drive.google.com/file/d/13QNe7YC3kJhJVvXRIJW20zZgaLLZkE-8/view?usp=sharing"
  })
  cred2.save(cred2).then(()=>{
    if (enteredusername === cred2.Username && enteredpassword === cred2.password){
      console.log("redirecting...");
      res.render("services.ejs",{user : enteredusername});
    }
  }) 
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});





























