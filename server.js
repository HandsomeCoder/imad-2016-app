var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: '',
    database: 'handsomecoder',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('index.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'index.css'));
});

app.get('sign.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'sign.css'));
});

app.get('/ui/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'style.css'));
});

app.get('/ui/css/site.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'site.css'));
});

app.get('/ui/css/profile.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'profile.css'));
});

app.get('/ui/css/blog.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'blog.css'));
});

app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'signup.html'));
});

app.get('/signin', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'signin.html'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'home.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
});

app.get('/ui/js/blog.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'blog.js'));
});

app.get('/ui/js/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'main.js'));
});

app.get('/ui/images/ME_0.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_0.jpg'));
});

app.get('/ui/images/ME_2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_2.jpg'));
});


app.get('/blog', function (req, res) {
  res.send(createBlog());
});

app.get('/blog/:blogNum', function (req, res) {
  pool.query("SELECT * FROM blog WHERE id = $1", [req.params.blogNum], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Blog not found');
        } else {
            res.send(createBlogContent(result.rows[0]));
        }
    }
  });
});

app.get('/blog/q/title', function (req, res) {
    var blogList = [];
   getResult("SELECT title FROM blog",function(err,rows){
      if(err){
          
      }else{
          for(i = 0;i < rows.length;i++){
              blogList.push(rows[i].title);
          }
          var titleContent = ``;
          for(i = 0;i < blogList.length;i++){
            titleContent += `<li onclick="getBlog(${i+1})"> ${blogList[i]} </li>`;
           }
          res.send(titleContent);
      } 
   });
});

app.get('/blog/q/comment', function (req, res) {
    var blogId = req.query.blogId;
    var name = req.query.name;
    var comment = req.query.comment;
    console.log(blogId);
    pool.query('INSERT INTO "commentRecord" ("blogid", "name", "comment") VALUES ($1,$2,$3)',[blogId,name,comment],function(err,rows){
        if(err){
            console.log("fail");
        }
        else{
            res.send(`success`);
        }
    });
});

app.get('/profile/comment', function (req, res) {
    var name = req.query.name;
    var comment = req.query.comment;
    pool.query('INSERT INTO "profileComment" ("name", "comment") VALUES ($1,$2)',[name,comment],function(err,rows){
        if(err){
            console.log("fail");
        }
        else{
            res.send(`success`);
        }
    });
});

app.get('/blog/q/fetchComment', function (req, res) {
    var blogId = req.query.blogId;
    var commentContent = ``; 
    getResult('SELECT name,comment FROM "commentRecord" WHERE blogId='+blogId,function(err,rows){
        if(err){
            
        }
        else{
            for(var i = 0;i < rows.length;i++){
                commentContent += `<span class="bold"> ${rows[i].name}:</span>
                                   <br>
                                   <span> ${rows[i].comment} </span>
                                   <br><br>`;
            }
            res.send(commentContent);
        }
    });

});

app.get('/profile/fetchComment', function (req, res) {
    var commentContent = ``; 
    getResult('SELECT name,comment FROM "profileComment"',function(err,rows){
        if(err){
            
        }
        else{
            for(var i = 0;i < rows.length;i++){
                commentContent += `<span class="bold"> ${rows[i].name}:</span>
                                   <br>
                                   <span> ${rows[i].comment} </span>
                                   <br><br>`;
            }
            res.send(commentContent);
        }
    });

});


app.get('/signup/user', function (req, res) {
    var fname = req.query.fname;
    var lname = req.query.lname;
    var email = req.query.email;
    var password = req.query.password;
    pool.query('INSERT INTO "user" ("fname","lname","email","password") VALUES ($1,$2,$3,$4)',[fname,lname,email,password],function(err,rows){
        if(err){
            console.log('Fail');
            res.sendFile(path.join(__dirname, 'ui/html', 'signup.html'));
        }
        else{
            console.log('Success');
            res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
        }
    });
});

app.get('/signin/check', function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    pool.query('select * from "signin" where email = $1 and password = $2',[email,password],function(err,rows){
        if(err){
            console.log('Fail');
            res.sendFile(path.join(__dirname, 'ui/html', 'signin.html'));
        }
        else{
            console.log('Success');
            res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
        }
    });
});

function executeQuery(str,callback){
    pool.query(str,function(err,result){
        if (err) {
            callback(err,null);
        } else {
                callback(null,result.rows);
        }
    });
}

function getResult(str,callback){
    executeQuery(str,function(err,rows){
        if(!err){
            callback(null,rows);
        }else{
            callback(true,null);
        }
    });
}

function createBlog(){
    var blogTemplate = `<!DOCTYPE html>
        <html>
            <head>
                <title>Blog</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="ui/css/site.css" rel="stylesheet"/>
                <link href="ui/css/blog.css" rel="stylesheet"/>
            </head>
            <body onload="getTitle()" >
            <nav>
                <a href="/">
                    <div id="backButton" class="operationalButton">
                        Home
                    </div>
                </a>
                <div id="pageTitle">
                    My Blog
                </div>
                <a href="profile">
                    <div id="pageButton"class="operationalButton">
                        Profile Page
                    </div>
                </a>
            </nav>
                <section id="container">
                    <section id="menuBar">
                        <div class="center bold">
                            Blog Titles
                        </div>
                        <div id="titleSection">
                        <ol id="blogTitle" start="1">
                        </ol>    
                        </div>
                    </section>
                    <section id="displayReg">
                        <h1> &#8592; Select Blog on Left panel </h1>
                    </section>
                </section>
                <script src="ui/js/blog.js"></script>
                <script src="ui/js/main.js"></script>
            </body>
        </html>`;
        
    return blogTemplate;
}

function createBlogContent(data){
    var id = data.id;
    
    var title = data.title;
    var date = data.date.toDateString();
    var content = data.content;
    
    var blogTemp=`<h1><span id="blogId">${id}</span>. ${title} </h1>
                  <p class="right-align margin" > ${date} </p>
                  <hr>
                  <p class="margin">
                    ${content}
                  </p>
                  <section id="commentSection" class="margin">
                    <h3> Comments : </h3>
                    <div id="postedComment">

                    </div>
                    <div>
                        <input type="text" id="name" placeholder="Enter your name"/>
                        <textarea id="comment" placeholder="Enter your Comment" rows="4"></textarea><br>
                        <input class="float-right" type="submit" value="Submit" onclick="addComment('b')"/>
                    </div>
                </section>`;
    return blogTemp;
}


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
