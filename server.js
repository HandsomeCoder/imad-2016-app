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

app.get('/ui/html/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/html', 'profile.html'));
});

app.get('/ui/images/ME_0.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_0.jpg'));
});

app.get('/ui/images/ME_2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'ME_2.jpg'));
});

app.get('/ui/blog', function (req, res) {
  res.send(createBlog);
});
function createBlog(){
    var blogList = ["blog1","blog2","blog3","blog4"];

    var blogTemplate = `<!DOCTYPE html>
        <html>
            <head>
                <title>Blog</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="site.css" rel="stylesheet"/>
                <link href="blog.css" rel="stylesheet"/>
            </head>
            <body>
                <nav>
                    <a href="index.html">
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
                    <section id="menuBar">
                        Menu Region
                    </section>
                    <section id="displayReg">
                    </section>
                </section>
            </body>
        </html>
        `;
    return blogTemplate;
}









var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
