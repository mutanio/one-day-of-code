// http://stackoverflow.com/questions/8508514/how-to-run-jquery-directly-on-any-page-in-the-browser

(function(){var jQueryVersion="1";var a=document.createElement("script");a.src="//ajax.googleapis.com/ajax/libs/jquery/"+jQueryVersion+"/jquery.js";a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a);})()

// var jQueryVersion="1";
// var a=document.createElement("script");
// a.src="//ajax.googleapis.com/ajax/libs/jquery/"+jQueryVersion+"/jquery.js";
// a.type="text/javascript";
// document.getElementsByTagName("head")[0].appendChild(a);

function createMessageTimeRow(message) {
  var tr=document.createElement("tr");
  var td=document.createElement("td");
  td.setAttribute('colspan', '2');
  var span = document.createElement('span');
  span.setAttribute('class', 'time');
  var timeAgo = document.createTextNode(message['created_at']);
  span.appendChild(timeAgo);
  td.appendChild(span);
  tr.appendChild(td);

  return tr;
}

function createMessageAuthorData(message) {
  var td=document.createElement("td");
  td.setAttribute('class', 'author');
  var author = document.createTextNode(message['author']);
  td.appendChild(author);

  return td;
}

function createMessageContentData(message) {
  var td=document.createElement("td");
  td.setAttribute('class', 'chat');
  var content = document.createTextNode(message['content']);
  td.appendChild(content);

  return td;
}

function createMessageBodyRow(message) {
  var tr=document.createElement("tr");
  tr.appendChild(createMessageAuthorData(message));
  tr.appendChild(createMessageContentData(message));

  return tr;
}

function appendMessage(message) {
  var tbody = $('#messages .list.unstyle tbody')[0];

  tbody.appendChild(createMessageTimeRow(message));
  tbody.appendChild(createMessageBodyRow(message));
}

function sendMessage(author, content, callback) {
  $.ajax({
  method: 'POST',
  url: 'https://wagon-chat.herokuapp.com/767609/comments',
  data: {
    author: author,
    content: content
  }
  }).done(callback);
}

function clearMessages() {
  var tbody = $('#messages .list.unstyle tbody')[0];

  // http://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
  }
}

function loadMessages() {
  $.ajax({
    url: 'https://wagon-chat.herokuapp.com/767609/comments'
  }).done(function(messages) {
    for (var i=0;i<messages.length;i++) {
      var message = messages[i];
      appendMessage(message);
    }
  });
};

$('document').ready(function() {
  clearMessages();
  loadMessages();
});


$('.weui-vcode-btn').click(function() {
  var author = $('.weui-input')[0].value;
  var message = $('.weui-input')[1].value;

  sendMessage(author, message, function(message) {
    appendMessage(message);
    message.value = '';
  });
});
