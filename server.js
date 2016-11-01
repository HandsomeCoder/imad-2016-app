var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
//var wait=require('wait.for');
//var sleep = require('sleep');

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

app.get('/ui/html/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
});

app.get('/ui/js/blog.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'blog.js'));
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

function executeQuery(str,callback){
    pool.query(str,function(err,result){
        if (err) {
            callback(err,null);
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('Query not found');
            } else {
                callback(null,result.rows);
            }
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
    pool.query('INSERT INTO "commentRecord" ("blogId", "name", "comment") VALUES ($1,$2,$3)',[blogId,name,comment],function(err,res){
        if(err){
            console.log("fail");
        }
        else{
            console.log("sucess");
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
                        &#8592; Back
                    </div>
                </a>
                <div id="pageTitle">
                    My Blog...!!!
                </div>
                <a href="ui/html/profile.html">
                    <div id="pageButton"class="operationalButton">
                        Profile Page
                    </div>
                </a>
            </nav>
                <section id="container">
                    <section id="menuBar">
                        <div class="operationalButton pointer marginRef" onclick="getTitle()">
                            Refresh Blog Title
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
            </body>
        </html>`;
        
    return blogTemplate;
}

function createBlogContent(data){
    var id = data.id;
    
    var title = data.title;
    var date = data.date;
    var content = data.content;
    
    var blogTemp=`<h1><span id="blogId">${id}</span>. ${title} </h1>
                  <p class="right-align margin" > ${date.toDateString()} </p>
                  <hr>
                  <p class="margin">
                    ${content}
                  </p>
                  <section class="margin">
                    <h3> Comments : </h3>
                    <div id="postedComment">

                    </div>
                    <div>
                        <input type="text" id="name" placeholder="Enter your name"/>
                        <textarea id="comment" placeholder="Enter your Comment" rows="4"></textarea><br>
                        <input type="submit" value="Add Comment" onclick="addComment()"/>
                    </div>
                </section>`;
    return blogTemp;
}

function fetchComments(blogId){

}

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
