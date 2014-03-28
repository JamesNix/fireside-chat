/* global Firebase:false */
/* exported Firebase */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#messageInput').keypress(pushData);
    myDataRef.on('child_added', pullData);
    $('#nameInput').focus();
    $('#reset').click(resetChat);
    $('#fire').click(makeFire);
  }

  var myDataRef = new Firebase('https://luminous-fire-3912.firebaseio.com/');
  //var localUser;
  var nameIndex;
  var chatNames = [];

  function pushData(e){
    if (e.keyCode === 13){
    //localUser = $('#nameInput').val();  // Find a better way to do this
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();

      myDataRef.push({name: name, text: text}); // This section takes input values and pushes as object to my data ref on Firebase
      $('#messageInput').val('');
      $('#messageInput').focus();
      $('#nameInput').attr('disabled', 'true'); // Prevents changing name mid-chat
    }
  }

  function pullData(snapshot){
    var message = snapshot.val();

    displayChatMessage(message.name, message.text);

    console.log(message.name);
    console.log(chatNames);
  }

  function displayChatMessage(name, text){
    debugger;
    var $div = $('<div/>').addClass('messages');
    var $clear = $('<div/>').addClass('clear');
    var localUser = $('#nameInput').val();
    var chatColors = ['lightblue', 'red', 'lightgreen', 'yellow', 'deeppink', 'chartreuse', 'goldenrod', 'lightsalmon', 'deeppink'];


    if($.inArray(name, chatNames) === -1){ //Pushes name to array if not there
      chatNames.push(name);
      nameIndex++;
    }

    if(name === localUser){
      $div.addClass('local');
    } else {
      document.getElementById('alert').play(); // Plays alert on incoming message
      $div.addClass('foreign');
    }

    $div.text(text).prepend($('<em/>').text(name+':  ')).appendTo($('#messagesDiv'));
    $div.css('background-color', chatColors[chatNames.indexOf(name)]);
    $clear.appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }

  function makeFire() {
    $('body').toggleClass('fire');
    if($('#fire').text('Go to hell')){
      $('#fire').text('');
      $('#fire').text('... and back');
    } else {
      $('#fire').text('');
      $('#fire').text('Go to hell');
    }
  }

  function resetChat(){
    $('#messagesDiv').empty();
    $('#nameInput').attr('disabled', 'false');
    myDataRef.set(null);
  }

})();
