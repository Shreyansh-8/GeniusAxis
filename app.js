// / const fdata = require('./static/home');
const alrt = require('./signup');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { query } = require('express');
const async = require('hbs/lib/async');
var nodemailer = require('nodemailer');
const { verify } = require('crypto');











const port = 3000;
// const box = alrt;
app.use(bodyparser.urlencoded());


main().catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://localhost:27017/loginData');
    await mongoose.connect('mongodb+srv://pandeyshreyansh50:mUbFMV6dmKVOQPUC@mymongodb.qnmn0k9.mongodb.net/');
    
    // data = await complaintData.complaint.find();
    //    const data = await Complaint.find()
    //     // const docs = JSON.parse(data)
    //     module.export = data;

}

const loginSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tel: String,
});
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// For servering static files
app.use(express.urlencoded());

// HBS SPECIFIC STUFF
app.set('view engine', 'hbs');// set the template engine as hbs
app.set('views', path.join(__dirname, 'views'));// set the view directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('login.hbs');
});

app.get('/signup', (req, res) => {
    res.status(200).render('signup.hbs');
});
app.get('/home',(req,res)=>{
    res.status(200).render('home.hbs')
});
app.get("/quiz",(req,res)=>{
    res.status(200).render('quiz.hbs')
});
app.get("/courses",(req,res)=>{
    res.status(200).render('courses.hbs')
});
app.get("/resume",(req,res)=>{
    res.status(200).render('resume.hbs')
});
// app.get('/home', (req, res) => {
//     res.render('home.hbs');
// });

app.post('/signup', async (req, res) => {
    const pass = req.body.password;
    const mail = req.body.email;
    const tel = req.body.tel;
    data = await Login.find({ email: mail });
    if (data == 0) {
        
          var myData = new Login(req.body);
          myData.save().then(async () => {
            const alert = true;
              // res.render('complaintPage2.hbs',{data:data})
  
              //   res.redirect('/Ideas/Views',{data})
              res.render('signup.hbs',{alert:alert});
          }).catch(() => {
            const unsaved = true;
            //   res.status(400).send("The item was not saved to the database");
            res.render('signup.hbs',{unsaved:unsaved});
          });
          
    }
    else {
    //   res.status(200).send("The email is already registered")
    res.render('signup.hbs');
    // import Signupalert;
    // console.log(Signupalert);
    // console.log('signup')
       
    }
    // res.status(200).render('complaint.hbs');
});



app.post('/home', async (req, res) => {
    mail = req.body.email1;
    pass = req.body.password1;
    await Login.findOne({ email: mail }, (error, dta) => {

        if (error) {
            return error;
        }
        else {
            if (pass == dta.password) {
                res.render('home.hbs',{mail:dta.email,pass:dta.password,FName:dta.firstName,LName:dta.lastName});
            }
            else {
                
            //   res.status(400).send("the email is not registered");
            // alert("The email is not registered")
            res.render('login.hbs')
            }
        }
    }).catch((error) => {
        // res.status(400).send();
        return error;
    });


})





















// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on ${port}`);
});