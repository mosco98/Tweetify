chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ app: true });
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //collect all of the urls here, I will just log them instead
        chrome.tabs.reload(tab.id);
      });
    });
  });
});


function app() {
  chrome.storage.local.get("app", function(data) {
    const { app } = data;
    if(app == true) {
      chrome.browserAction.setIcon({path: 'twitter.png'});
    }
  });
  
  chrome.storage.local.get("app", function(data) {
  const { app } = data;
  if(app == false) {
    chrome.browserAction.setIcon({path: 'twitter2.png'});
  }
  });
}


setInterval(app, 100);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.app === "on") {
      sendResponse({message: "hi to you"});
      chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
          window.tabs.forEach(function(tab){
            //collect all of the urls here, I will just log them instead
            chrome.tabs.reload(tab.id);
          });
        });
      });
    }
  });

