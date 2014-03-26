/* global Firebase:false */
/* exported Firebase */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#messageInput').keypress(pushData);
    myDataRef.on('child_added', pullData);
    $('#nameInput').focus();
  }

  var myDataRef = new Firebase('https://luminous-fire-3912.firebaseio.com/');

  function pushData(e){
    if (e.keyCode === 13){
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text}); // This section takes input values and pushes as object to my data ref on Firebase
      $('#messageInput').val('');
    }
  }

  function pullData(snapshot){
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  }

  function displayChatMessage(name, text){
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    if(name !== $('#nameInput').val()){
      document.getElementById('alert').play();  //$('#alert').trigger('play'); will also work here
      //displayChatName(message.name);
    }
  }

  // function displayChatName(name){
  //   if(name)
  // }



})();
