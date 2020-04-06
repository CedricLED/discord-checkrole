const Discord = require('discord.js');
exports.run = (Bot, message, args) => {

  //Check for Admin Perms
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let userMention = message.mentions.members;
    let roleMention = message.mentions.roles;
    var noRoleArray = [];
    var roleArray = [];

    if (!roleMention.first())
      return message.channel.send('You forgot some parameters! Look at the help!').then(msg => msg.delete(5000));

    var indexRole = 0;
    notUserMessage(Bot, message, args);
    roleMention.forEach((checkRole) => {
      indexRole++;
      var indexUser = 0;

      notUser(Bot, message, args).then((result) => {
        if (result.length > 0) {
          result.forEach((checkUser) => {
            if (checkUser.roles.has(checkRole.id)) {
              roleArray.push(`${checkUser.user.tag}`);
            } else {
              noRoleArray.push(`${checkUser.user.tag}`);
            }
          });
        }
      });

      if (userMention.first()) {
        userMention.forEach((checkUser) => {
          if (checkUser.roles.has(checkRole.id) === false) {
            noRoleArray.push(`${checkUser.user.tag}`);
          } else {
            roleArray.push(`${checkUser.user.tag}`);
          }
        });
      }
    });
    setTimeout(function() {
      let userMessage = "**Users without roles:** \n";
      if (noRoleArray.sort().join(',') === roleArray.sort().join(',')) {
        return;
      } else {
        removeDuplicates(noRoleArray).filter(val => !roleArray.includes(val)).forEach((noRole) => {
          userMessage += noRole + "\n";
        });
        setTimeout(function() {
          message.channel.send(userMessage);
        }, 2000);
      }
    }, 2000);
  }
};

function notUser(Bot, message, args) {
  return new Promise((resolve, reject) => {
    let users = args.slice(1).join(' ');
    let notUserTag = users.match(/(.+[#]+[0-9]{4})/g);
    let tagMention = [];
    if (notUserTag) {
      let index = 0;
      notUserTag.forEach((tag) => {
        let check = Bot.users.find(function(element) {
          return element.tag === tag;
        });
        if (check == null) {
          index++;
          if (index == notUserTag.length) {
            resolve(tagMention);
          }
        } else {
          tagMention.push(message.guild.members.get(check.id));
          index++;
          if (index == notUserTag.length) {
            resolve(tagMention);
          }
        }
      });
    } else {
      resolve(tagMention);
    }
  });
}

function notUserMessage(Bot, message, args) {
  let users = args.slice(1).join(' ');
  let notUserTag = users.match(/(.+[#]+[0-9]{4})/g);
  let userMessage = "**Users not in server:** \n";
  if (notUserTag) {
    notUserTag.forEach((tag) => {
      let check = Bot.users.find(function(element) {
        return element.tag === tag;
      });
      if (check == null) {
        userMessage += tag + "\n";
      }
    });
    setTimeout(function() {
      message.channel.send(userMessage);
    }, 2000);
  }
}


function removeDuplicates(arr) {
  let unique_array = [];
  for (let i = 0; i < arr.length; i++) {
    if (unique_array.indexOf(arr[i]) == -1) {
      unique_array.push(arr[i]);
    }
  }
  return unique_array;
}
