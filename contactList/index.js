
const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware1
// app.use(function(req,res,next)
// {
//     req.myName = "Amolak";
//     // console.log('middleware 1 called');
//     next();
// });

// // middleware 2
// app.use(function(req,res,next)
// {
//     console.log('My Name from MW2',req.myNmae);
//     // console.log('middleware 2 called');
//     next();
// });

var contactList = [
    {
        name:"Amolak",
        phone:"1111111111"
    },
    {
        name : "Tony Stark",
        phone : "1234567890"
    },
    {
        name : "Apurva",
        phone : "153426789"
    }
]


// app.get('/profile',function(req,res)
app.get('/',function(req,res)
{
//(__dirname); console it out
//res.send('<h1>Cool it is running or is it???</h1>')
    // console.log('from the get controller',req.myName)
    // console.log(req.myName);

    Contact.find({}, function(err,contacts)
    {
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title : "My Contacts List",
            //contact_list: contactList
            contact_list:contacts
        });

    });

    
});

app.get('/practise',function(req,res)
{
return res.render('practise',
{
    title : "Let's play with ejs"});
});

app.post('/create-contact',function(req,res)
{
    // return res.redirect('/practise');
    // console.log(req.body);       We want to add this in our array
    // console.log(req.body.name);   we will be appending our list in the following manner
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //contactList.push(req.body);
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact)
    
    {
        if(err)
        {
            console.log('error in creating a contact!');
        }

        console.log('**********',newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});


// app.get('/delete-contact/:phone',function(req,res)
app.get('/delete-contact/',function(req,res)
{
    //console.log(req.params);
    // let phone=req.params.phone;   string params

    // console.log(req.query);
    // let phone = req.query.phone;   query params

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);       //finding the index of the contact to be deleted
    // if(contactIndex != -1)
    // {
    //     contactList.splice(contactIndex, 1);
    // }

    //get the id from query in the url

    let id = req.query.id;
    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleting an object from database');
            return;
        }
    })
    return res.redirect('back');
    
});

app.listen(port,function(err)
{
    if(err)
    {
    console.log('Error in running the server',err);
    }

    console.log('Yup! My Express Server is working on port :',port);
})
