
const content = document.createElement('img');
content.className = 'tweetify sharing';
var imgURL = chrome.runtime.getURL("images/twitter.png");
content.src = imgURL;


document.body.appendChild(content);



function getHighlight() {
 
  var selection = window.getSelection(); // 1.

  var object = {
      parent : null,
      text   : '',
      rect   : null
  };

  // If selection is not empty.
  if ( selection.rangeCount > 0 ) {
      object = {
          text   : selection.toString().trim(), // get the text.
          parent : selection.anchorNode.parentNode, // get the element wrapping the text.
          rect   : selection.getRangeAt(0).getBoundingClientRect() // get the bounding box.
      };
  }

  

  return object;
}

function saveSelection() {
  let highlight = getHighlight();
  console.log(highlight.text);
  if(highlight.text !== '') {
    chrome.storage.local.set({ text: highlight.text, isEmpty: 'no' });
    sharing.setAttribute( 'class', 'sharing' );

    var twitterWindow = window.open('https://twitter.com/intent/tweet?text=' + highlight.text, 'twitter-popup', 'height=350,width=600');
    if(twitterWindow.focus) { twitterWindow.focus(); }
      return false;
  }
}

content.addEventListener('click', saveSelection);




	
var sharing = document.querySelector( '.tweetify' );
 
function showMenu() {
 
    // 1.
    let highlight = getHighlight();
 
    // 2.
    if ( highlight.text === '' ) {
 
        sharing.setAttribute( 'class', 'sharing btn' );
        sharing.style.right = 0;
        sharing.style.top  = 0;
 
        return;
    }

    chrome.storage.local.get("loggedIn", function(data) {
      if(data.loggedIn !== 'yes') {
        sharing.setAttribute( 'class', 'sharing btn' );
        sharing.style.right = 0;
        sharing.style.top  = 0;
 
        return;
      }
    });
 
    // 3.
    /**
     * Only show the sharing button if the selected is a paragraph.
     */
    if ( highlight.parent.nodeName == 'a' || highlight.parent.nodeName == 'img' || highlight.parent.nodeName == 'input' 
          || highlight.parent.nodeName == 'button'
    ) {
        return;
    }
 
    // 4.
    var width = ( highlight.rect.width / 2 ) - 42;
    /**
     * The "42" is acquired from our sharing buttons width devided by 2.
     */
 
    sharing.setAttribute( 'class', 'btn sharing--shown' );
    sharing.style.left = ( highlight.rect.left + width ) + 'px';
    sharing.style.top  = ( highlight.rect.top - 40 ) + 'px';
    /**
     * "40" is the height of our sharing buttons.
     * Herein, we lift it up above the higlighted area top position.
     */
}


document.addEventListener('selectionchange', () => {
  getHighlight();
  showMenu();
});


