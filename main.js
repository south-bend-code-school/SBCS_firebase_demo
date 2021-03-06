(function(){

  $(document).ready(init);

  var config = {
    apiKey: "AIzaSyBZaXDNDyjPTRb55hJln1bIUhCH9Qd9I90",
    authDomain: "cte-firebase-demo.firebaseapp.com",
    databaseURL: "https://cte-firebase-demo.firebaseio.com",
    storageBucket: "cte-firebase-demo.appspot.com",
    messagingSenderId: "413677182100"
  };

  function init(){
    firebase.initializeApp(config);
    $('#submitButton').click(writeData);
    loadData();
  }

  function writeData() {
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();

    var project = {
      fname : fname,
      lname : lname,
      email : email,
    };

    var newProjectKey = firebase.database().ref().child('Project').push().key;
    var updates = {};
    updates['/Project/' + newProjectKey] = project;

    return firebase.database().ref().update(updates);
  }

  function loadData(){
    firebase.database().ref('/Project/').on('value', function(snapshot){
      var users = snapshot.val();
      $.each(users, function(key, value){
        $('#email-list').append("<p>"+value.email+"</p>")
      })
    })
  }

})();
