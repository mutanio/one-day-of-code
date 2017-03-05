//////////////////////////// begin helper methods ///////////////////////////////
//
// inject jQuery directly into webpage
//
// http://stackoverflow.com/questions/8508514/how-to-run-jquery-directly-on-any-page-in-the-browser
//
// (function(){var jQueryVersion="1";var a=document.createElement("script");a.src="//ajax.googleapis.com/ajax/libs/jquery/"+jQueryVersion+"/jquery.js";a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a);})()
//
// **** extract query from path ****
//
// TO STUDENTS:
// don't worry, you don't need to understand this!
//
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//////////////////////////// end helper methods ///////////////////////////////

// DOM manipulations...
function createMessageAuthorElement(message) {
  var td=document.createElement("td");
  td.setAttribute('class', 'author');
  var author = document.createTextNode(message['author']);
  td.appendChild(author);

  return td;
}

// DOM manipulations...
function createMessageContentElement(message) {
  var td=document.createElement("td");
  td.setAttribute('class', 'content');
  var content = document.createTextNode(message['content']);
  td.appendChild(content);

  return td;
}

// DOM manipulations...
function appendMessage(message) {
  var tr=document.createElement("tr");
  tr.appendChild(createMessageAuthorElement(message));
  tr.appendChild(createMessageContentElement(message));

  var tbody = $('#comments-list tbody')[0];

  tbody.appendChild(tr);
};

// with this getParameterByName helper method,
// we are able to change the room ID with this `?id=xxx` syntax
// https://mutanio.github.io/one-day-of-code/groupchat/?id=9000
function getURL() {
  var id = getParameterByName('id') || 888;

  return 'https://wagon-chat.herokuapp.com/' + id + '/comments';
}

function sendMessage(author, content, callback) {
  $.ajax({
  method: 'POST',
  url: getURL(),
  data: {
    author: author,
    content: content
  }
  }).done(callback);
}

// remove all existing messages from the HTML!
function clearMessages() {
  var tbody = $('#comments-list tbody')[0];

  // http://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
  }
}

// load messages from Le Wagon Chat API!
// https://wagon-chat.herokuapp.com/20170305/comments
function loadMessages() {
  $.ajax({
    url: getURL(),
  }).done(function(messages) {
    // first we remove all message rows!
    clearMessages();

    // then for each message, we append a `tr`!
    for (var i=0;i<messages.length;i++) {
      var message = messages[i];
      appendMessage(message);
    }
  });
};

$('document').ready(function() {
  // TODO:
  // call the function to load messages from the server
  loadMessages();

  window.setInterval(function() {
    // TODO:
    // call the function to reload messages again
    // just to ensure we are not missing new messages from others!
    loadMessages();
  }, 5000);
});

$('#comment-form').submit(function(event) {
  var authorField = $('#input-name')[0];
  var contentField = $('#input-content')[0];

  sendMessage(authorField.value, contentField.value, function(message) {
    appendMessage(message);
    contentField.value = '';
  });

  // TODO:
  // uncomment of this code
  // think and then ask teacher: why we need to `preventDefault()`?
  event.preventDefault();
});
