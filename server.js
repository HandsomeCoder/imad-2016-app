var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/ui/images/ME_0.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_0.jpg'));
});

app.get('/ui/images/ME_2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_2.jpg'));
});

app.get('/blog', function (req, res) {
  res.send(createBlog());
});
function createBlog(){
    var blogList = ["blog1","blog2","blog3","blog4"];
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
                    <a href="/">
                        <div class="operationalButton">
                            &#8592; Back
                        </div>
                    </a>
                    <a href="Blog Page">
                        <div class="operationalButton" style="float: right;">
                            Profile Page
                        </div>
                    </a>
                </nav>
                <section id="container">
                    <section id="menuBar">`;
                    
    var blogTemplate3=`<ol start="1">`;
    
    for(var i = 0;i < blogList.length;i++){
        blogTemplate3 += `<a href="#"><li> ${blogList[i]}  </li></a>`;
    }
    blogTemplate3 += `<ol>`;
    
    var blogTemplate2 = `</section>
                    <section id="displayReg">
                        <h1> &#8592; Select Blog on Left panel </h1>
                    </section>
                </section>
            </body>
        </html>
        `;
    return blogTemplate1+blogTemplate3+blogTemplate2;
}









var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
