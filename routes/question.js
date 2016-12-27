/**
 * Created by Ivaldo on 07/12/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST
var Question = require('../model/Question');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));
// Get all questions
router.route('/all').get(function (req, res, next) {
    Question.find({}, function (err, questions) {
        if (err) {
            return console.error(err);
        } else {
            res.json(questions);
        }
    })
});

router.route('/random').get(function (req, res, next) {
    Question.findOneRandom(function (err, result) {
        if (err) {
            return console.error(err);
        } else {
            res.json(result);
        }
    })
});

router.route('/').post(function (req, res) {
    var statement = req.body.statement;
    var questionA = req.body.questionA;
    var questionB = req.body.questionB;
    var questionC = req.body.questionC;
    var questionD = req.body.questionD;
    var questionE = req.body.questionE;
    var correctAnswer = req.body.correctAnswer;

    mongoose.model('Question').create({
        statement: statement,
        questionA: questionA,
        questionB: questionB,
        questionC: questionC,
        questionD: questionD,
        questionE: questionE,
        correctAnswer: correctAnswer
    }, function (err, question) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            console.log('POST creating new question: ' + question);
            res.json(question)

        }
    })
});


module.exports = router;