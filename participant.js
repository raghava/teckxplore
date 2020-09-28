

//load scripts
var dynamicScripts = [
  "https://unpkg.com/formiojs@latest/dist/formio.full.min.js",
  "https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/7.6.0/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js",
  "https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js",
  "https://www.googletagmanager.com/gtag/js",
  "https://meet.jit.si/external_api.js"
];

for (var i = 0; i < dynamicScripts.length; i++) {
  let node = document.createElement('script');
  node.src = dynamicScripts[i];
  node.type = 'text/javascript';
  node.async = false;
  node.charset = 'utf-8';
  document.getElementsByTagName('head')[0].appendChild(node);
}

(function ($) {
  "use strict"

  /* 1. Proloder */
  $(window).on('load', function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAj89_ebT8q4DYXylJVsQpwYfpu9ESTeew",
      authDomain: "teckxplore-expo.firebaseapp.com",
      databaseURL: "https://teckxplore-expo.firebaseio.com",
      projectId: "teckxplore-expo",
      storageBucket: "teckxplore-expo.appspot.com",
      messagingSenderId: "140058136153",
      appId: "1:140058136153:web:2c7eca385108166e996b48",
      measurementId: "G-8702P44YSX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics.isSupported().then((isSupported) => {
      if (isSupported) {
      }
  })
    let participant_modal = document.getElementById('participant-modal');
    let participant_login = document.getElementById('participant-login-screen')

    var modal_div = document.createElement('div');
    var login_div = document.createElement('div');
    modal_div.innerHTML = `<div id="participant-reg" class="modal fade">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Participant Registration Form</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div id="participant-msg"></div>
          <div id="formio"></div>
        </div>
      </div>
    </div>
  </div>`
    participant_modal.appendChild(modal_div);


    login_div.innerHTML = `
    <div id="participant-login" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div id="login-msg"></div>
          <input type="email" class="form-control" placeholder="Email" id="email">
          <input type="password" class="form-control mt-3" placeholder="password" id="password">
          <button class="btn btn-primary mt-3" onClick="login()">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>`

    participant_login.appendChild(login_div);


    //Forms
    Formio.icons = 'fontawesome';
    Formio.createForm(
      document.getElementById('formio'),
      'https://inqforms.mygumpu.com/#/form/5f5c6fc0c6f62176bed9676e/',
      {
        hooks: {
          beforeSubmit: function (submission, next) {
            let data = submission.data;
            ['submit', 'confirmEmail', 'confirmPassword'].forEach(key => {
              delete data[key];
            })
            let element = document.getElementById('participant-msg');
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
              .then(function (user) {
                if (((user || {}).user || {}).uid) {
                  firebase.firestore().collection('participants').doc(user.user.uid).set({ ...data });
                  let login_msg = document.getElementById('login-msg');
                  if (login_msg) {
                    login_msg.innerHTML = 'Participant successfully created please login';
                    login_msg.className += 'alert alert-success';
                  }
                  setTimeout(() => {
                    jQuery('#participant-reg').modal('hide');
                    jQuery('#participant-login').modal('show');
                  }, 2000)
                }
              }).catch(function (error) {
                if (element) {
                  element.innerHTML = error.message;
                  element.className += 'alert alert-danger';
                }
              });
          }
        }
      }
    ).then((form) => {
      form.on('change', function (data) {
        let element = document.getElementById('participant-msg');
        if (element) {
          element.innerHTML = '';
          element.className = '';
        }
      })
    })

  });

  $('#get-ticket').click(function () {
    if (localStorage.getItem('participant')) {
      return;
    } else {
      jQuery("#participant-reg").modal('show');
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
        jQuery("#participant-login").modal('hide');
      }, 3000)
    })
    .catch(e => {
      element.innerHTML = e.message;
      element.className += 'alert alert-danger';
    })
}
