function validateonsignup(){
    var fname = document.getElementById('fname');
    var lname = document.getElementById('lname');
    var email = document.getElementById('emailup');
    var password = document.getElementById('passwordup');
    var cpassword = document.getElementById('cpassword');
    
    fname.classList.remove("invalid");
    lname.classList.remove("invalid");
    email.classList.remove("invalid");
    password.classList.remove("invalid");
    cpassword.classList.remove("invalid");
    
    var check = true;
    if(fname.value === ""){
        fname.classList.add("invalid");
        check = false;
    }
    if(lname.value === ""){
        lname.classList.add("invalid");
        check = false;
    }
    if(email.value === ""){
        email.classList.add("invalid");
        check = false;
    }
    if(password.value === ""){
        password.classList.add("invalid");
        check = false;
    }
    if(cpassword.value === ""){
        cpassword.classList.add("invalid");
        check = false;
    }
    if(password.value !== "" && cpassword.value !== "" && cpassword.value !== password.value){
        password.classList.add("invalid");
        cpassword.classList.add("invalid");
        alert("Password and Confirm Password \n Should be Same");
        check = false;
    }
    if(check){
        comment.classList.remove("invalid");
        return true;
    }
    else{
        return false;
    }
}

var signup = document.getElementById('signupBtn');
signup.onclick = function () {
    if(validateonsignup() === true){
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                      signup.value = 'Sucess!';
                } else if (request.status === 403) {
                      signup.value = 'Invalid credentials. Try again?';
                } else if (request.status === 500) {
                    alert('Something went wrong on the server');
                      signup.value = 'Login';
                  } else {
                    alert('Something went wrong on the server');
                    submit.value = 'Login';
                    }
                }  
            };
        
            var fname = document.getElementById('fname').value;
            var lname = document.getElementById('lname').value;
            var email = document.getElementById('emailup').value;
            var password = document.getElementById('passwordup').value;
            console.log(fname);
            console.log(password);
            request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signup/user', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({fname: fname,lname: lname,email: email, password: password}));  
            signup.value = 'Logging in...';
        }
    };
    
var signin = document.getElementById('signinBtn');
signin.onclick = function () {
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  signin.value = 'Sucess!';
                   window.location.assign("http://handsomecoder.imad.hasura-app.io/blog");
              } else if (request.status === 403) {
                  signin.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  signin.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
          }  
          // Not done yet
        };
        
        // Make the request
        var email = document.getElementById('emailin').value;
        var password = document.getElementById('passwordin').value;
        console.log(email);
        console.log(password);
        request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signin/check', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({email: email,password: password}));  
        signin.value = 'Logging in...';
        
    };
