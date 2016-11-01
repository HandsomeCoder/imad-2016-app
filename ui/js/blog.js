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

function addComment(){
    var blogId = document.getElementById('blogId').innerHTML;
    blogId = parseInt(blogId);
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                loadComment(blogId);
          }
      }  
    };
    
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/q/comment?blogId='+blogId+'&name='+name+'&comment='+comment, true);
    request.send(null);
}

function loadComment(blogId){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                var commentContent = request.responseText;
                document.getElementById('postedComment').innerHTML = commentContent.toString();   
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/q/fetchComment?blogId'+blogId, true);
    request.send(null);
}