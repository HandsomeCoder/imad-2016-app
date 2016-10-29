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
    request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
                var blogContent = request.responseText;
                document.getElementById('displayReg').innerHTML = blogContent.toString();   
          }
      }  
    };
    
    request.open('GET', 'http://handsomecoder.imad.hasura-app.io/blog/title', true);
    request.send(null);
}