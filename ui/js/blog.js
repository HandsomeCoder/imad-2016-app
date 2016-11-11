function getBlog(x){
        var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
                var blogContent = request.responseText;
                document.getElementById('displayReg').innerHTML = blogContent.toString();
                loadComment(x);
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/'+x, true);
    request.send(null);
}

function getTitle(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                var blogTitle = request.responseText;
                document.getElementById('blogTitle').innerHTML = blogTitle.toString();   
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/q/title', true);
    request.send(null);
}

function getName(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {

                document.getElementById('username').innerHTML =  request.responseText;   
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/getName', true);
    request.send(null);
}

function getTitleAndName(){
    getTitle();
    getName();
}

function writeComment(){
    window.location.assign("http://handsomecoder.imad.hasura-app.io/sign");
}

function logout(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                window.location.assign("http://handsomecoder.imad.hasura-app.io/blog");  
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/logout', true);
    request.send(null);
}