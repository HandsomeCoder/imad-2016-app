function validate(){
    var name = document.getElementById('name');
    var comment = document.getElementById('comment');
    name.classList.remove("invalid");
    comment.classList.remove("invalid");
    var check = true;
    if(name.value === ""){
        name.classList.add("invalid");
        check = false;
    }
    if(comment.value === ""){
        comment.classList.add("invalid");
        check = false;
    }
    if(check){
        name.classList.remove("invalid");
        comment.classList.remove("invalid");
        return true;
    }
    else{
        return false;
    }
}


function addComment(x){
    if(validate()){
        var request = new XMLHttpRequest();
        var name = document.getElementById('username').value;
        var comment = document.getElementById('comment').value;
        
        if(x == 'b'){
            var blogId = document.getElementById('blogId').innerHTML;
            blogId = parseInt(blogId);
            
            request.onreadystatechange = function () {
              if (request.readyState === XMLHttpRequest.DONE) {
                  if (request.status === 200) {
                        loadComment(blogId,false);
                        document.getElementById('comment').value = "";
                  }
              }  
            };
            request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/q/comment?blogId='+blogId+'&name='+name+'&comment='+comment, true);
            request.send(null);
        }
        else{
            request.onreadystatechange = function () {
              if (request.readyState === XMLHttpRequest.DONE) {
                  if (request.status === 200) {
                        loadComment(null,true);
                        document.getElementById('name').value = "";
                        document.getElementById('comment').value = "";
                  }
              }  
            };
            request.open('GET', 'http://handsomecoder.imad.hasura-app.io/profile/comment?name='+name+'&comment='+comment, true);
            request.send(null);
        
        }
    }
}

function loadComment(blogId,profile){
    var request = new XMLHttpRequest();
    if(!profile){
        request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                    var commentContent = request.responseText;
                    document.getElementById('postedComment').innerHTML = commentContent.toString();   
              }
          }  
        };
        
        request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/q/fetchComment?blogId='+blogId, true);
        request.send(null);
    }
    else{
        request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                    var commentContent = request.responseText;
                    document.getElementById('postedComment').innerHTML = commentContent.toString();   
              }
          }  
        };
        
        request.open('GET', 'http://handsomecoder.imad.hasura-app.io/profile/fetchComment', true);
        request.send(null);
        
    }
        
}
