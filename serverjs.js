const express = require('express');
const path = require('path');
const surveyApp = express();
const ejs = require('ejs');
const port = process.env.PORT || 3010;
const mongoose = require('mongoose');
const randomstring = require('randomstring')
const Survey = require('./models/SVmodel');
const User = require('./models/USmodel');


//DB connection

mongoose.connect('mongodb+srv://Ogheneruno:<password>@runo.pdvi8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(dbconnect => console.log('Database connection successful'))
.catch(error => console.log('Database connection error: ', error.message))

//setting up express

surveyApp.use(express.json());
surveyApp.use(express.urlencoded({ extended: true}));
surveyApp.use(express.static(path.join(__dirname, 'public')));

surveyApp.set('views', path.join(__dirname,'views'));
surveyApp.set('view engine', 'ejs');
surveyApp.locals.moment = require('moment');


surveyApp.get('/', async (request, response) => {
    //response.send('You have reached the homepage')
    let allusers = User;
    console.log(allusers);
    response.render('user', {registrations: allusers});

});

surveyApp.post('/registration/create-register',(request, response) => {
    let {firstName, lastName, eMail, phoneNumber} = request.body;

    const userID = randomstring.generate(12);

    console.log('Form Data:::::: ',request.body)
    let {registration} = request.body;

    let newUser = new User({
        userID,
        firstName,
        lastName,
        eMail,
        phoneNumber
    });

    newUser.save()
    .then ((data) => console.log('Registration successfull', data))
    .catch (() => console.log('Error Unable to register'))
    response.render('sucspage', {firstName: firstName, lastName: lastName, userID: userID});
});

surveyApp.get('/survey', async (request, response) => {
    let allsurveyforms = Survey;
    console.log(allsurveyforms);
    response.render('survey',{surveyforms:allsurveyforms});
});

surveyApp.post('/surveyform/submit-surveyform',(request, response) => {
    let {title, description, location, startDate, endDate, user_ID} = request.body;
    console.log('Form Data:::::: ',request.body)
    let {submitted} = request.body;

    let newSurvey = new Survey({
        title, 
        description, 
        location, 
        startDate, 
        endDate, 
        user_ID
    });

    newSurvey.save()
    .then (({title, description, location, startDate, endDate, user_ID}) => console.log('Survey Submitted', request.body))
    .catch (() => console.log('Unable to submit survey'))
    response.redirect('/survey');   
    });
    
surveyApp.listen(port, () => console.log(`Servers Started And Listening On Port::: ${port}`));