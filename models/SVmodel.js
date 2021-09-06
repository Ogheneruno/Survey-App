const mongoose = require('mongoose');
const {Schema} = mongoose;
const surveySchema = new Schema({
    survey:{
        title: String,
        description: String,
        location: String,
        startDate: Date,
        endDate: Date,
        user_ID: String,
    }
},{timestamps:true});

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;