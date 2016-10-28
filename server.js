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

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
