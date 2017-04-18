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

    console.log(project);

    var newProjectKey = firebase.database().ref().child('Project').push().key;
    var updates = {};
    updates['/Project/' + newProjectKey] = project;

    firebase.storage().ref().child('images/projects/' + newProjectKey).put($('#photo')[0].files[0]).then(function(snapshot){
        return firebase.database().ref().update(updates).then(function(){
          window.location.replace('./index.html');
        });
      }).catch(function(error) {
        console.log(error.message);
      });
  }

})();
