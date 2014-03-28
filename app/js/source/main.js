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
    document.onload(resetChat);
    //weatherRef.child('temperature').on('value', getWeather());
  }

  var myDataRef = new Firebase('https://luminous-fire-3912.firebaseio.com/');
  //var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/nashville/currently');

  function pushData(e){
    if (e.keyCode === 13){
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();

      myDataRef.push({name: name, text: text}); // This section takes input values and pushes as object to my data ref on Firebase
      $('#messageInput').val('');
      $('#messageInput').focus();
      $('#nameInput').attr('disabled', 'true'); //prevents changing name mid-chat
      chatNames.push(name);
    }
  }

  function pullData(snapshot){
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);

    chatNames.push(message.name); //experimental
  }

  function displayChatMessage(name, text){
    var $div = $('<div/>').addClass('messages');
    var $clear = $('<div/>').addClass('clear');

    if(name !== $('#nameInput').val()){
      document.getElementById('alert').play();
      $div.addClass('foreign');
      $div.text(text).prepend($('<em/>').text(name+':  ')).appendTo($('#messagesDiv'));
      $clear.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    } else {
      $div.addClass('local');
      $div.text(text).prepend($('<em/>').text(name+':  ')).appendTo($('#messagesDiv'));
      $clear.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  }

  // function getWeather(snapshot){
  //   console.log('Temperature is currently ' + snapshot.val());
  // }

  function resetChat(){
    $('#messagesDiv').empty();
    $('#nameInput').attr('disabled', 'false');
    myDataRef.set(null);
  }

})();
