function getBlog(x){
        var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
                var blogContent = request.responseText;
                document.getElementById('displayReg').innerHTML = blogContent.toString();   
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

function addComment(){
    var blogId = document.getElementById('blogId').value;
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    
    alert(blogId+ name+comment);
}