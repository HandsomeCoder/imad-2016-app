resetup.onclick = function(){
    document.getElementById('fname').value="";
    document.getElementById('lname').value="";
    document.getElementById('emailup').value="";
    document.getElementById('passwordup').value="";
    document.getElementById('cpassword').value="";
};

resetin.onclick = function(){
    document.getElementById('emailin').value="";
    document.getElementById('passwordin').value="";
};
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
        alert("Password and Confirm Password Should be Same");
        check = false;
    }
    if(password.value !== "" && cpassword.value !== ""){
        if(password.value.length <= 4 || password.value.length >= 15){
            password.classList.add("invalid");
            cpassword.classList.add("invalid");
            alert("Password length should be between 4 to 15 characters");
            check = false;
        }
    }
    if(check){
        fname.classList.remove("invalid");
        lname.classList.remove("invalid");
        email.classList.remove("invalid");
        password.classList.remove("invalid");
        cpassword.classList.remove("invalid");
        return true;
    }
    else{
        return false;
    }
}

function validateonsignin(){

    var email = document.getElementById('emailin');
    var password = document.getElementById('passwordin');


    email.classList.remove("invalid");
    password.classList.remove("invalid");

    var check = true;

    if(email.value === ""){
        email.classList.add("invalid");
        check = false;
    }
    if(password.value === ""){
        password.classList.add("invalid");
        check = false;
    }

    if((password.value !== "") &&(password.value.length <= 4 || password.value.length >= 15)){
        password.classList.add("invalid");
        alert("Password length should be between 4 to 15 characters");
        check = false;
    }
    if(check){
        email.classList.remove("invalid");
        password.classList.remove("invalid");
        return true;
    }
    else{
        return false;
    }
}



var signup = document.getElementById('signupBtn');
signup.onclick = function () {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('emailup').value;
    var password = document.getElementById('passwordup').value;
    if(validateonsignup() === true){
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                      signup.value = 'Sucess!';
                      window.location.assign("http://handsomecoder.imad.hasura-app.io/blog");
                } else if (request.status === 403) {
                      signup.value = 'Submit';
                      var c = confirm("User already Registered\n If you have forget password click on \"OK\" else \"Cancel\"");
                      if(c === true){
                          var con = prompt("Enter \"CONFIRM\" to override the password"); 
                          if(con === "confirm" || con === "CONFIRM"){
                                updateUser(fname,lname,email,password);
                          }
                      }
                } else if (request.status === 500) {
                    alert('Something went wrong on the server');
                      signup.value = 'Login';
                  } else {
                    alert('Something went wrong on the server');
                    submit.value = 'Login';
                    }
                }  
            };
        
            request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signup/user', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({fname: fname,lname: lname,email: email, password: password}));  
            signup.value = 'Registering...';
        }
};

function updateUser(fname,lname,email,password){
     var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
                alert("Password Override! Try login with new password");
          }else{
            alert("Something went wrong! Try Again");
          }
      }  
    };
    
    request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signup/updateuser', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({fname: fname,lname: lname,email: email, password: password}));
    request.send(null);
}
    
var signin = document.getElementById('signinBtn');
signin.onclick = function () {
    if(validateonsignin() === true){
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
        request.open('POST', 'http://handsomecoder.imad.hasura-app.io/signin/check', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({email: email,password: password}));  
        signin.value = 'Logging in...';
    }
};
