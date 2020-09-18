

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
          <button type="submit"  class='mr-2 btn btn-primary' onClick="login()">Login</button>
          <button type="button" class='ml-2 btn btn-light'>Forgot password</button>
          </div> 
          <hr style='margin: 10px;'>
          <span style='text-align: center;display: grid;'>Don't have an anccount?</span >
          <button type="button" class="btn btn-success col-lg-12" onClick="register()">Create an account</button>
        </div>
      </div>
    </div>
  </div>`
    login_modal.appendChild(modal_div);
  });

  $('#check-login').click(function () {
      if (localStorage.getItem('participant')) {
        return;
      } else {
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

