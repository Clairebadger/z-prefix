const express = require('express');
const cors = require('cors');
const app = express();
var bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.options('*', cors());
app.use(express.json())

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const knex = require('knex')(config)
const PORT = process.env.PORT || 8081;


/* GET REQUESTS */
app.get('/', (req,res) => {
    res.send("app running!")
})

app.get('/posts', (req,res) => { //all posts
    knex('post')
        .select('*')
        .then(data => {
            res.send(data)
        })
})

app.get('/posts/:id', (req,res) => { //all posts created by user
    let user_id = parseInt(req.params.id);
    knex('post')
        .where({userid : user_id})
        .select("*")
        .then(data => {
            res.status(200).send(data)
        })
})

app.get('/posts/details/:id', (req,res) => { //all posts created by user
    let post_id = parseInt(req.params.id);
    knex('post')
        .where({id : post_id})
        .select("*")
        .then(data => {
            res.status(200).send(data)
        })
})

/* POST REQUESTS */

app.post('/post', (req, res) => { //edit a post
    knex('post')
    .returning(Object.keys(req.body))
    .then(data => res.status(200).json(data))
})

app.post('/signup', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
    knex('bloguser').insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
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
    knex('bloguser')
    .where({username: req.body.username})
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

/* PATCH REQUESTS */

app.patch('/post/:id', (req, res) => { //edit a post

})

/* DELETE REQUESTS */

app.delete('/post/:id', (req, res) => { //delete a post

})

app.listen(PORT, () => {
    console.log(`z prefix application listening on ${PORT}`);
})