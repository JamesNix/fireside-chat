/* global Firebase, test, ok:false */

'use strict';

test('Firebase#new', function(){
  var f1 = new Firebase('https://luminous-fire-3912.firebaseio.com/');

  ok(f1 instanceof Firebase, 'f1 should be an instance of Firebase');
});
