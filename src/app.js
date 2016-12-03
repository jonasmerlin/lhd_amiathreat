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

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

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
    db();
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
});
