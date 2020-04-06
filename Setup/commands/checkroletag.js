const Discord = require('discord.js');
exports.run = (Bot, message, args) => {

  //Check for Admin Perms
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let users = args.slice(1).join(' ');
    let notUser = users.match(/(.+[#]+[0-9]{4})/gi);
    if (notUser) {
      message.channel.send("Not User:");
      notUser.forEach((tag) => {
        let check = Bot.users.find(function(element) {
          return element.tag === tag;
        });
        if (check == null) {
          message.channel.send(tag);
        }
      });
    }
  }
};
