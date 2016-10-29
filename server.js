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
  pool.query("SELECT title,date,content FROM blog WHERE id = $1", [req.params.blogNum], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
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

app.get('/blog/q/db', function (req, res) {
    var blogList = [];
   getResult("SELECT title FROM blog",function(err,rows){
      if(err){
          
      }else{
          for(var i = 0;i < rows.length;i++){
              blogList.push(rows[0].title);
          }
          res.send(blogList);
      } 
   });
});

function createBlog(){
    var blogList = getResult("SELECT title FROM blog",function(err,rows){
      if(err){
          
      }else{
        return rows;
      } 
   });
   return blogList;
//   sleep.sleep(2);
   
/*  
    var dis;
    var blogTemplate1 = `<!DOCTYPE html>
        <html>
            <head>
                <title>Blog</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="ui/css/site.css" rel="stylesheet"/>
                <link href="ui/css/blog.css" rel="stylesheet"/>
            </head>
            <body>
            <nav>
                <a href="index.html">
                    <div id="backButton" class="operationalButton">
                        &#8592; Back
                    </div>
                </a>
                <div id="pageTitle">
                    My Blog...!!!
                </div>
                <a href="#">
                    <div id="pageButton"class="operationalButton">
                        Profile Page
                    </div>
                </a>
            </nav>
                <section id="container">
                    <section id="menuBar">`;
                    
    var blogTemplate3=`<ol start="1">`;
    
    for(var i = 0;i < blogList.length;i++){
        blogTemplate3 += `<li onclick="getBlog(${i})"> ${blogList[i]} </li> `;
    }
    blogTemplate3 += `</ol>`;
    
    var blogTemplate2 = `</section>
                    <section id="displayReg">
                        <h1> &#8592; Select Blog on Left panel </h1>
                    </section>
                </section>
                <script src="ui/js/blog.js"></script>
            </body>
        </html>
        `;
    return blogTemplate1+blogTemplate3+blogTemplate2;*/
}

function createBlogContent(data){
    var title = data.title;
    var date = data.date;
    var content = data.content;
    
    var blogTemp=`<h1> ${title} </h1>
                  <p class="right-align margin" > ${date.toDateString()} </p>
                  <hr>
                  <p class="margin">
                    ${content}
                  </p>`;
    return blogTemp;
}






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
