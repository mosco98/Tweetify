console.log('running');

var firebaseConfig = {
  apiKey: "AIzaSyDj1Qyj8NJq4Cr7rDU5mDs1Nxy0XclDpvY",
  authDomain: "twitter-4f570.firebaseapp.com",
  databaseURL: "https://twitter-4f570.firebaseio.com",
  projectId: "twitter-4f570",
  storageBucket: "",
  messagingSenderId: "672120534057",
  appId: "1:672120534057:web:c010d2f2589899c3"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.TwitterAuthProvider();



function twitterSignin() {
   firebase.auth().signInWithPopup(provider) 
  .then(function(result) {
    
      var user = result.user;
      const photo = user.photoURL;

      if(typeof result == 'undefined') {
        chrome.storage.local.set({ loggedOut: 'yes' });
      } else {
        alert("Tweetify will reload all open Tabs to properly work");
        chrome.storage.local.set({ photo: photo, loggedIn: 'yes', loggedOut: 'no' });
        chrome.windows.getAll({populate:true},function(windows){
          windows.forEach(function(window){
            window.tabs.forEach(function(tab){
              //collect all of the urls here, I will just log them instead
              chrome.tabs.reload(tab.id);
            });
          });
        });
      }
   })
   .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

function twitterSignout() {
  firebase.auth().signOut()
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });

  chrome.storage.local.set({ loggedIn: 'no' });
}



function changeIcon() {
  chrome.storage.local.get("loggedIn", function(data) {
    if(data.loggedIn == 'yes') {
      chrome.browserAction.setIcon({path: 'twitter.png'});
    }
  
    if(data.loggedIn !== 'yes') {
      chrome.browserAction.setIcon({path: 'twitter2.png'});
    }
  });
}

setInterval(changeIcon, 100);


  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(request);
      if (request.connect === "yes") {
        sendResponse({message: "hi to you"});
        twitterSignin();
      }
    });

    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        console.log(request);
        if (request.logout === "yes") {
          sendResponse({message: "hi to you"});
          twitterSignout();
        }
      });
    


