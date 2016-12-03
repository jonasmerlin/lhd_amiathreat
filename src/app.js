// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import { db } from './db/db';
window.$ = window.jQuery = require('jquery');
const { BrowserWindow } = require('electron');
import { MongoClient } from 'mongodb';
import sudo from 'sudo-prompt';
import shell from 'shelljs';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
var options = {
  name: 'Electron'
};
var networkInterfaces;
var netdiscoverResults = [];

function startsWithDigit(value) {
  return !isNaN(parseInt(value));
}

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
  // let child = new BrowserWindow({parent: top, modal: true, show: false})
  // child.loadURL('https://github.com')
  // child.once('ready-to-show', () => {
  //   child.show()
  // });
    // document.getElementById('greet').innerHTML = greet();
    // document.getElementById('platform-info').innerHTML = os.platform();
    // document.getElementById('env-name').innerHTML = env.name;
    // db();
    document.getElementById('checkButton').addEventListener('click', function() {
      $('.container').html('<div class="spinner">\
            <div class="rect1"></div>\
            <div class="rect2"></div>\
            <div class="rect3"></div>\
            <div class="rect4"></div>\
            <div class="rect5"></div>\
          </div>'
      );
      window.setTimeout(function () {
        $('.container').html('<p>Finished!</p>')
      }, 5000);
    });

      // Async call to exec()
      shell.exec('ifconfig | expand | cut -c1-8 | sort | uniq -u | awk -F: "{print $1;}"', function(status, output) {
        console.log('Exit status:', status);
        console.log('Program output:', output);
        networkInterfaces = output.split('\n').map(Function.prototype.call, String.prototype.trim).filter(String);
        console.log(networkInterfaces);
      });
      console.log(os.platform());


      if(os.platform() == "linux"){
        sudo.exec('timeout 5s netdiscover -L -r 192.168.1.0/24 -i wlo1', options, function(error, stdout, stderr) {
          if (error !== null) {
              console.log(`exec error: ${error}`);
          }
          var resultArr = stdout.replace( / +/g, ' ' ).split('\n').map(Function.prototype.call, String.prototype.trim).filter(startsWithDigit);
          resultArr.forEach(function(element, index) {
            element = element.split(" ");
            netdiscoverResults[index] = {
                ipAddr: element[0],
                macAddr: element[1],
                count: element[2],
                len: element[3],
                macVendor: element.slice(4).join(" ")
            };
          });
          console.log("Result:");
          console.log(netdiscoverResults);
        });

      } else if (os.platform() == "darwin") {
        shell.exec('arp -a', function(status, output) {
          var resultArr = output.split('\n');

          resultArr.forEach(function(element, index, arr) {
            element = element.split(" ");
                netdiscoverResults[index] = {
                    hostName: element[0],
                    ipAddr: element[1].replace("(","").replace(")",""),
                    hwType: element[7].replace("[","").replace("]",""),
                    macAddr: element[3],
                    mask: element[4],
                    interface: element[5]
                };
          });
          console.log("Result:");
          console.log(netdiscoverResults);
        });
      }

      MongoClient.connect("mongodb://ewlgsandkj34k54:AGhk5kjafhau4sdkjg@ds119368.mlab.com:19368/pentesting_database",
      function(err, db) {
        if(!err) {
          console.log("Hi Ireland!");
        }
        console.log(db);
        var collection = db.collection('allDatabases');
        collection.find({}).toArray(function(err, result) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(result);
          }
        });
    });
});
