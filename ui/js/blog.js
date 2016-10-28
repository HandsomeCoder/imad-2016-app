function getBlog(x){
        var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
                var blogContent = request.responseText;
                document.getElementById('displayReg').innerHTML = blogContent.toString();   
          }
      }  
      // Not done yet
    };
    
    // Make the request
    request.open('GET', 'http://coco98.imad.hasura-app.io/blog'+x.toString(), true);
    request.send(null);
}

