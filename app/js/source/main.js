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
    //weatherRef.child('temperature').on('value', getWeather());
  }

  var myDataRef = new Firebase('https://luminous-fire-3912.firebaseio.com/');

  //var weatherRef = new Firebase('https://publicdata-weather.firebaseio.com/nashville/currently');
  var chatNames = []; //experimental (these four lines)
  // var sessionId = 1;
  // var colors = ['red', 'green', 'purple', 'brown', 'yellow', 'gray', 'chartreuse', 'coral', 'tomato', 'deeppink'];

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

    // var currentName = message.name;
    // assignAttribute(currentName);
  }

  function displayChatMessage(name, text){
    var $div = $('<div/>').addClass('messages');

    if(name !== $('#nameInput').val()){
      document.getElementById('alert').play();
      $div.addClass('foreign');
      $div.text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    } else {
      $div.addClass('local');
      $div.text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  }

  // function assignAttribute(currentName){
  //   debugger;
  //   _.uniq(chatNames);
  //   for(var i=0; i<chatNames.length; i++){
  //     if(currentName === chatNames[i]){
  //       currentName.css('color', 'blue');
  //       return;
  //     }
  //   }
  //   currentName.attr('id', sessionId);
  //   currentName.css('color', colors.shift());
  //   sessionId++;
  //   console.log(currentName);
  //   console.log(chatNames);
  // }

  // function getWeather(snapshot){
  //   console.log('Temperature is currently ' + snapshot.val());
  // }

  function resetChat(){
    myDataRef.set(null);
    $('#messagesDiv').empty();
    $('#nameInput').attr('disabled', 'false');
  }

})();
