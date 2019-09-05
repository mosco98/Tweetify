const connect = document.querySelector('.connect');
const textArea = document.querySelector('.textArea');
const imageCtn = document.querySelector('.profile-img-ctn');
const home = document.querySelector('.home');
const signIn = document.querySelector('.sign-in');
const logoutBtn = document.querySelector('.logout-btn')


// Sign in Button

connect.addEventListener('click', function() {
  chrome.runtime.sendMessage({connect: "yes"}, (response) => {
     console.log(response.message);
   });
});

// Sign Out Button

logoutBtn.addEventListener('click', function() {
  chrome.runtime.sendMessage({logout: "yes"}, (response) => {
     console.log(response.message);
   });
});

// App Function

function app() {
  chrome.storage.local.get(["photo","name","loggedIn"], function(data) {
    const { photo, loggedIn } = data;

    imageCtn.src = photo;

    if(loggedIn == 'yes') {
      signIn.style.display = 'none';
      home.style.display = 'flex';
    }

    if(loggedIn !== 'yes') {
      signIn.style.display = 'flex';
      home.style.display = 'none';
    }
  });
}

setInterval(app, 100);

function checkLogin() {
  chrome.storage.local.get("loggedIn", function(data) {
    if(data.loggedIn == 'yes') {
      signIn.style.display = 'none';
    }
    if(data.loggedIn !== 'yes') {
      signIn.style.display = 'flex';
    }
  });
}

setInterval(checkLogin, 100);



