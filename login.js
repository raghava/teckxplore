

// load scripts

var dynamicScripts = [
  "https://unpkg.com/formiojs@latest/dist/formio.full.min.js",
  "https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/7.6.0/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js"
];

for (var i = 0; i < dynamicScripts.length; i++) {
  let node1 = document.createElement('script');
  node1.src = dynamicScripts[i];
  node1.type = 'text/javascript';
  node1.async = false;
  node1.charset = 'utf-8';
  document.getElementsByTagName('head')[0].appendChild(node1);
}

(function ($) {
  "use strict"

  /* 1. Proloder */
  $(window).on('load', function () {
    let login_modal = document.getElementById('login-modal');
    var modal_div = document.createElement('div');
    modal_div.innerHTML = `<div id="login" class="modal fade">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign In</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <div id="login-msg"></div>    
          <input type="email" class="form-control" placeholder="Email Address"  id="email" name="uname">
    
          <input type="password" class="form-control mt-3 mb-3" placeholder="Password" name="psw" id="password">
          <div style='text-align: center;'> 
          <button type="submit"  class='mr-2' id='login-account' onClick="login()" style='padding-left: 40px;padding-right: 40px;'>Login</button>
          <button type="button" class='ml-2' id='forgot-account' onClick="forgetPassword()">Forgot password</button>
          </div> 
          <hr style='margin: 10px;'>
          <span style='text-align: center;display: grid;'>Don't have an anccount?</span >
          <button type="button" class="col-lg-12" id='create-account' onClick="register()">Create an account</button>
        </div>
      </div>
    </div>
  </div>`
    login_modal.appendChild(modal_div);

    let forget_modal = document.getElementById('forget-modal');
    var modal_div = document.createElement('div');
    modal_div.innerHTML = `<div id="forget" class="modal fade">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign In</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <div id="forget-msg"></div>    
          <input type="email" class="form-control" placeholder="Email Address"  id="emailId" name="uname">
          <hr style='margin: 10px;'>
          <span style='text-align: center;display: grid;'>Don't have an anccount?</span >
          <button type="button" class="col-lg-12" id='forget-account' onClick="sendMail()">Submit</button>
        </div>
      </div>
    </div>
  </div>`
  forget_modal.appendChild(modal_div);
  });

  $('#check-login').click(function () {
      if (localStorage.getItem('participant')) {
        return;
      } else {
        let btn1 = document.getElementById('create-account');
        btn1.className += 'btn btn-success btn-sm btn-block';
        let btn2 = document.getElementById('login-account');
        btn2.className += 'btn btn-primary btn-sm';
        let btn3 = document.getElementById('forgot-account');
        btn3.className += 'btn btn-secondary btn-sm';
        jQuery("#login").modal('show');
      }
  })
})(jQuery);


//login 
function login() {
  let element = document.getElementById('login-msg');
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      localStorage.setItem("participant", JSON.stringify(res));
      element.innerHTML = 'Logged in successfully';
      element.className += 'alert alert-success';
      setTimeout(() => {
        jQuery("#login").modal('hide');
        window.location.href = "about.html";
      }, 3000)
    })
    .catch(e => {
      element.innerHTML = e.message;
      element.className += 'alert alert-danger';
    })
}

function register(){
  jQuery("#login").modal('hide');
  jQuery("#participant-reg").modal('show');
}


function forgetPassword(){
  let btn3 = document.getElementById('forget-account');
  btn3.className += 'btn btn-primary btn-sm btn-block';
  jQuery("#login").modal('hide');
  jQuery("#forget").modal('show');
}

function sendMail(){
  let element = document.getElementById('forget-msg');
  let email = document.getElementById('emailId').value;
  firebase.auth().sendPasswordResetEmail(email)
  .then((res) => {
    console.log(res);
    element.innerHTML = 'Reset password mail has been sent to your email.'
    element.className += 'alert alert-success';
    setTimeout(() => {
      jQuery("#forget").modal('hide');
    }, 3000)
  })
  .catch(e => {
    console.log(e);
  })
}
