import { MongoClient } from 'mongodb';

export var db = function() {
  var url = "mongodb://ewlgsandkj34k54:AGhk5kjafhau4sdkjg@ds119368.mlab.com:19368/pentesting_database";
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
    } else {
      console.log("Hi from Ireland!");
      var collection = db.collection('allDatabases');
      collection.find({}).toArray(function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(result);
        }
      });
    }
  });
};
