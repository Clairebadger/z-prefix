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
        .select('post.id', 'userid', 'username', 'title', 'content')
        .then(data => {
            res.send(data)
        })
})

app.get('/posts/:id', (req,res) => { //all posts created by user 
    let user_id = parseInt(req.params.id);
    knex('bloguser')
        .join('post', 'bloguser.id', 'post.userid')
        .select('post.id', 'userid', 'username', 'title', 'content')
        .where({userid : user_id})
        .then(data => {
            res.status(200).send(data)
        })
})

app.get('/posts/details/:id', (req,res) => { //all details of a single post
    let post_id = parseInt(req.params.id);
    knex('bloguser')
        .join('post', 'bloguser.id', 'post.userid')
        .select('post.id', 'userid', 'username', 'title', 'content')
        .where({'post.id' : post_id})
        .then(data => {
            res.status(200).send(data)
        })
})

/* POST REQUESTS */

app.post('/post', (req, res) => { //add a post
    if (req.body.title.length > 20 || req.body.content.length > 250){
        console.log(req.body)
        res.send("Input too long")
    }
    else{
        knex('post')
        .insert({
            userid : req.body.userid,
            title: req.body.title,
            content: req.body.content
        })
        .returning(Object.keys(req.body))
        .then(data => res.status(200).json(data))
    }
    
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
                        res.json({body:user.id})
                        //res.status(200).send("success")
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
    console.log(req.body)
    if (req.body.title.length > 20 || req.body.content.length > 250){
        res.send("Input too long")
    }
    else{
        knex('post')
            .where({ id: req.body.id })
            .update(req.body)
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