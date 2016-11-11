var submit = document.getElementById('submit');
submit.onclick = function () {
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
          }  
          // Not done yet
        };
        
        // Make the request
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        console.log(fname);
        console.log(password);
        request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signup/user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({fname: fname,lname: lname,email: email, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
var submit = document.getElementById('submit');
submit.onclick = function () {
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
          }  
          // Not done yet
        };
        
        // Make the request
        var uname = document.getElementById('uname').value;
        var password = document.getElementById('password').value;
        console.log(uname);
        console.log(password);
        request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signin/check', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({uname: uname,password: password}));  
        submit.value = 'Logging in...';
        
    };
