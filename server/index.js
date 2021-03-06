const express = require('express');
const cors = require('cors');
const app = express();
var bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
//app.options('*', cors());
app.use(express.json())

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const knex = require('knex')(config)
const PORT = process.env.PORT || 8081;

app.options("*", (req, res) => {
    res.status(200).send("Preflight request allowed");
  });

/* GET REQUESTS */
app.get('/', (req,res) => {
    res.send("app running!")
})

app.get('/posts', (req,res) => { //all posts
    knex('bloguser')
        .join('post', 'bloguser.id', 'post.userid')
        .select('post.id', 'userid', 'username', 'title', 'content', 'date')
        .then(data => {
            res.send(data)
        })
})

app.get('/posts/:id', (req,res) => { //all posts created by user 
    let user_id = parseInt(req.params.id);
    knex('bloguser')
        .join('post', 'bloguser.id', 'post.userid')
        .select('post.id', 'userid', 'username', 'title', 'content', 'date')
        .where({userid : user_id})
        .then(data => {
            res.status(200).send(data)
        })
})

app.get('/posts/details/:id', (req,res) => { //all details of a single post
    let post_id = parseInt(req.params.id);
    knex('bloguser')
        .join('post', 'bloguser.id', 'post.userid')
        .select('post.id', 'userid', 'username', 'title', 'content', 'date')
        .where({'post.id' : post_id})
        .then(data => {
            res.status(200).send(data)
        })
})

/* POST REQUESTS */

app.post('/post', (req, res) => { //add a post
    console.log(req.body)
    if (req.body.title.length > 30 || req.body.content.length > 1000){
        console.log(req.body)
        res.status(400).send("Input too long")
    }
    else{
        knex('post')
        .insert({
            userid : req.body.userid,
            title: req.body.title,
            date: req.body.date,
            content: req.body.content
        })
        .returning(Object.keys(req.body))
        .then(data => res.status(200).json(data))
    }
    
})

app.post('/signup', function (req, res) {
    let requsername = req.body.username
    if (req.body.firstname.length > 30 || req.body.lastname.length > 30 || req.body.username.length > 30 || req.body.password.length > 250){
        longInput = true
        res.status(400).send("Input too long")
    }
    else{
    knex("bloguser")
        .select('*')
        .where({username : requsername})
        .then(data => {
            if (data.length > 0){
                res.status(300).send("username taken")
            }
            else{
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
            }
        })
    }
})

app.post('/login', function (req, res) {
    
    let longInput = false
    if (req.body.username.length > 30 || req.body.password.length > 250){
        longInput = true
        res.status(401).send("Input too long")
    }
    else{
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
                            res.json({body:user.id})
                            //res.status(200).send("success")
                        }
                        else{
                            res.status(404).send("cannot login user")
                        }
                    })
            }
        });
    }
});

/* PATCH REQUESTS */

app.patch('/post/:id', (req, res) => { //edit a post

    let longInput = false
    let postid = parseInt(req.params.id);

    if (req.body.title){
        if (req.body.title.length > 50){
            longInput = true
            res.status(400).send("Input too long")
        }
    }
    if (req.body.content){
        if (req.body.content.length > 10000){
            longInput = true
            res.status(400).send("Input too long")
        }
    }
    if(!longInput){
        knex('post')
            .where({ id: postid })
            .update(req.body, Object.keys(req.body))
            .then(data => {
                res.status(200).json(data) //send data over if success
        })
    }
})

/* DELETE REQUESTS */

app.delete('/post/:id', (req, res) => { //delete a post
    let del_id = parseInt(req.params.id);
    knex('post')
      .where({ id: del_id })
      .del()    // returns number of affected rows
      .then(data => {
        console.log(del_id)
        res.status(200).json(`Number of records deleted: ${data}`)
      })

})

app.listen(PORT, () => {
    console.log(`z prefix application listening on ${PORT}`);
})