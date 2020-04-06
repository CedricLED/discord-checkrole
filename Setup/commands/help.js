exports.run = (Bot, message, args) => {
  //Just sends an embed to the Channel and deletes it afterwards

  message.channel.send("", {
    embed: {
      "title": `${Bot.user.username}'s Help!`,
      "description": "`help` - Displays this help\n" +
        "`blocktext <add/del> <channel>` - Enables blocktext on channel\n" +
        "`checkrole <roles> <users>` - checks list of users for roles\n" +
        "`listrole <roles> <users>` - Returns users in each role"
    }
  }).then(msg => msg.delete(30000));
};
