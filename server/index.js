const express = require('express');
const cors = require('cors');
const app = express();
var bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
const PORT = process.env.PORT || 8081;


app.post('/signup', function (req, res) {
    console.log(req.body)
    bcrypt.hash(req.body.passwordsignup, saltRounds, function (err,   hash) {
    knex('movie_users').insert({
        name: req.body.usernamesignup,
        email: req.body.emailsignup,
        password: hash
     }).then(function(data) {
      if (data) {
        res.status(200)
        res.redirect('/');
      }
      else{
        res.status(404)
      }
    });
   });
})

app.post('/login', function (req, res) {
    knex('movie_users')
    .where({email: req.body.email})
    .select('*')
    .then(user =>  {
        user = user[0]
        
        if (user ===  undefined) {
            res.status(400).send('Cannot find user')
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then (function(result) {
                    if(result){
                        res.status(200).send("successful login!")
                    }
                    else{
                        res.status(404).send("cannot login user")
                    }
                })
        }
    });
});

app.listen(PORT, () => {
    console.log(`z prefix application listening on ${PORT}`);
})