const request = require('request');
const Discord = require('discord.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const client = new Discord.Client();

function getChildText(elems) {
  ret = "";
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].children.length != 0) {
      ret += getChildText(elems[i].children);
    }
    if (elems[i].textContent != "") {
      ret += elems[i].textContent;
    }
  }
  return ret;
}

function ping(ip, msg) {
  //54.36.165.198:7808
  //54.37.245.139:7814  
  request('https://kigen.co/scpsl/browser.php?table=y', { json: false }, (err, res, body) => {
    if (err) { return console.log(err); }
    html = new JSDOM(body);
    var playinfo;
    try {
      var tableRows = html.window.document.body.getElementsByTagName('tbody')[0].children;
      for (var idx = 0 ; idx < tableRows.length ; idx++) {
        console.log(tableRows[idx].children[3].innerHTML);        
        if (tableRows[idx].children[3].innerHTML.includes('<span style="color:#ffff00ff;">The</span> <b><span style="color:#ffff00ff;">Holy</span></b> <span style="color:#ffff00ff;">Land</span>')) {
          playinfo = tableRows[idx].children[5].innerHTML.split('/');
        }
      }
      msg.edit(playinfo[0] +" out of "+ playinfo[1] +" players are currently playing on The Holy Land!");
    } catch (e) {
      console.log(e);
      msg.edit("An error occured.");
    }
    //console.log(body);
  });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('!scping')) {
    msg.reply('Retrieving Server Info...').then(reply => {
      try {
        ping(msg.content.split(" ")[1], reply);
      } catch (e) {
        console.log(e);
        reply.edit("An error occured.");
      }
    }).catch(console.error);
  }
});
client.login('NzUzMjA5NjYwNjM0MzAwNDQ3.X1i3KQ.drvHcFW2G1jcuXthJkfjcEZuo-0');