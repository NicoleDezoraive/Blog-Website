//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "When I started writing this blog, my main goal was to practice for job interviews and improve the skills needed to succeed in interviews.\nThose who search will find posts in the blog that essentially tell about my personal achievements, post tips with recommendations and motivation to continue looking for a job, etc.\nThe goal is that this blog will become my place to discuss career issues, personal development, doubts, personal projects, and more.\nEverything is related to the world of programming and high-tech work.\nIf you enjoyed it (or not) I am more than happy to receive comments, suggestions for improvements, and ideas for additional posts.\nIf you have used my blog to find a job or advance in your career, let me know, it gives me the energy to keep writing!\nI hope you find posts that will be interesting and useful to you.";
const aboutContent = "I’m Nicole, and if there’s one thing you need to know about me, is that I am motivated to learn, grow and excel.\n I graduated B.Sc. in Software and Information Systems Engineering from the Ben-Gurion University of the Negev.\nLooking for a full-time position as a software developer.\nAlways had a passion for new technologies, and love solving Logic puzzles and programming problems.\nLooking for an adventure with new challenges along in the software development world!";
const contactContent = "My Contact Details:";
const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home', {
    paragraphTextHome: homeStartingContent,
    newListPosts: posts
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    paragraphTextContact: contactContent,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    paragraphTextAbout: aboutContent,
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    image: req.body.postImage,
  };
  posts.push(post);
  res.redirect("/");
});

app.get('/posts/:postName', (req, res) => {
  const reqTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title)
    if ( storedTitle === reqTitle){
      res.render('post', {
        postTitle: post.title,
        postTest: post.content,
        postImage: post.image
      });
    }
  });
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
