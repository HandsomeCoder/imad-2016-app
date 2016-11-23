var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


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
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/sign.css', function (req, res) {
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

app.get('/sign', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'sign.html'));
});


app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
});

app.get('/ui/js/sign.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'sign.js'));
});

app.get('/ui/js/blog.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'blog.js'));
});

app.get('/ui/js/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'main.js'));
});

app.get('/ui/images/ME_2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_2.jpg'));
});


app.get('/blog', function (req, res) {
    console.log(checkLogin(req));
  res.send(createBlog(checkLogin(req)));
});

app.get('/blog/:blogNum', function (req, res) {
  pool.query("SELECT * FROM blog WHERE id = $1", [req.params.blogNum], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Blog not found');
        } else {
            res.send(createBlogContent(result.rows[0],checkLogin(req)));
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
    getResult('SELECT name,comment,time FROM "commentRecord" WHERE blogId='+blogId,function(err,rows){
        if(err){
            
        }
        else{
            for(var i = 0;i < rows.length;i++){
                commentContent += `<span class="bold"> ${rows[i].name}:</span>
                                   <br>
                                   <span> ${rows[i].comment} </span>
                                   <br>
                                   <span class="small-font"><i> ${rows[i].time.toLocaleTimeString()} on ${rows[i].time.toLocaleDateString()} <i></span>
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


app.post('/signup/user', function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('SELECT * FROM "user" WHERE email = $1',[email],function(err,result){
       if(err){
           console.log(err);
       }
       else{
            if(result.rows.length === 0){
                pool.query('INSERT INTO "user" ("fname","lname","email","password") VALUES ($1,$2,$3,$4)',[fname,lname,email,dbString],function(err,rows){
                    if(err){
                        console.log('Fail');
                        res.sendFile(path.join(__dirname, 'ui/html', 'sign.html'));
                        
                    }
                    else{                
			req.session.auth = {fname: fname,lname: lname};
                        console.log('Success');
			res.send("success");
                    }
                });
            }
            else{
                console.log("already user");
                res.status(403).send('User is already Registered');
            }
       }
    });

});

app.post('/signup/updateuser', function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('UPDATE "user" SET fname=$1,lname=$2,password=$4 WHERE email=$3',[fname,lname,email,dbString],function(err,rows){
    	if(err){
		console.log('Fail');
		res.sendFile(path.join(__dirname, 'ui/html', 'sign.html'));
	}
	else{
		console.log('UPDATE');
                req.session.auth = {fname: fname,lname: lname};
		res.send("Updated");
	}
    });        
});

app.post('/signin/check', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("Data->"+email+" "+password);
    pool.query('SELECT * FROM "user" WHERE email = $1', [email], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('email/password is invalid');
          } else {

              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              if (hashedPassword === dbString) {
                
                req.session.auth = {fname: result.rows[0].fname,lname: result.rows[0].lname};
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('email/password is invalid');
              }
          }
      }
    });
});

app.get('/getName', function (req, res) {
    console.log(req.session.auth.fname+" "+req.session.auth.lname);
    res.send(req.session.auth.fname+" "+req.session.auth.lname);
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('done');
});

function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

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

function createBlog(checkLogin){
    var blogTemplate = `<!DOCTYPE html>
        <html>
            <head>
                <title>Blog</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="ui/css/site.css" rel="stylesheet"/>
                <link href="ui/css/blog.css" rel="stylesheet"/>
                <link rel="icon" href="ui/images/MEicon.ico">
            </head>
            `;
    if(checkLogin){
        blogTemplate+=`<body onload="getTitleAndName()" >
            <section id="loggedin">
                <span id="username"></span>
                <div class="operationalButton" onclick="logout()">
                        logout
                </div>
  			</section>`;
    }else{
        blogTemplate+=`<body onload="getTitle()" >
            <section id="loggedin">
                <span class="hid">You are not Logged In.</span>
        	</section>`;   
    }
  			
  	blogTemplate+=`<nav>
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
                        <div class="center">
                            <h1>Blog Titles</h1>
                        </div>
                        <div id="titleSection">
                        <ol id="blogTitle" start="1">
                            Loading Title...
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

function createBlogContent(data,checkLogin){
    var id = data.id;
    
    var title = data.title;
    var date = data.date.toLocaleDateString();
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

                    </div>`;
    
        if(checkLogin){
            blogTemp+=`<div>
                        <textarea id="comment" placeholder="Enter your Comment" rows="4"></textarea><br>
                        <input class="float-right" type="submit" value="Submit" onclick="addComment('b')"/>
                    </div>
                </section>`;
        }else{
            blogTemp+=`<div class="operationalButton" onclick="writeComment()">
                        Write Comment
                    </div>
                </section>`;
        }
    return blogTemp;
}

function checkLogin(req){
    if(req.session && req.session.auth && req.session.auth.fname){
        return true;
    }
    else{
        return false;
    }
}

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
