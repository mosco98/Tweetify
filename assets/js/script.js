const appSwitch = document.querySelector('.app-switch');


function appSwitching() {
  if(appSwitch.checked) {
    chrome.storage.local.set({ app: true });
  } else {
    chrome.storage.local.set({ app: false });
  }
}

chrome.storage.local.get("app", function(data) {
  const { app } = data;
  appSwitch.checked = app;
});


appSwitch.addEventListener('click', () => {
  appSwitching();
  if(appSwitch.checked == true) {
    alert("Tweetify will reload all tabs")
    chrome.runtime.sendMessage({app: "on"}, (response) => {
      console.log(response.message);
    });
  }
});
