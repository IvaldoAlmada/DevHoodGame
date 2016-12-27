/**
 * Created by Ivaldo on 07/12/2016.
 */

var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var questionSchema = new mongoose.Schema({
    statement: String,
    questionA: String,
    questionB: String,
    questionC: String,
    questionD: String,
    questionE: String,
    correctAnswer: String
}).plugin(random);

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
