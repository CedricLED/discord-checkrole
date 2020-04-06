exports.run = (Bot, message, args) => {

  //Check for Admin Perms
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let channelMention = message.mentions.channels.first();

    //Look if the User did something wrong and if he did return an error!
    if (!args[0] || !channelMention)
      return message.channel.send('You forgot some parameters! Look at the help!').then(msg => msg.delete(5000));

    switch (args[0]) {
      case 'add':
        Bot.sql.get(`SELECT * FROM blocktext WHERE (ServerId, ChannelId) = (?, ?)`, [message.guild.id, channelMention.id]).then((log) => {
          if (typeof log === 'undefined') {
            Bot.sql.run(`INSERT INTO blocktext (ServerId, ChannelId) VALUES (?, ?)`, [message.guild.id, channelMention.id])
              .catch(function(error) {
                console.log(error);
                return;
              });
            message.reply(`Channel: ${channelMention.name} added to blocktext list.`);
          } else {
            message.reply(`This channel is already blocking text!`);
          }
        }).catch();
        break;
      case 'del':
        Bot.sql.get(`SELECT * FROM blocktext WHERE (ServerId, ChannelId) = (?, ?)`, [message.guild.id, channelMention.id]).then((log) => {
          if (typeof log !== 'undefined') {
            Bot.sql.run(`DELETE FROM blocktext WHERE (ServerId, ChannelId) = (?, ?)`, [message.guild.id, channelMention.id])
              .catch(function(error) {
                console.log(error);
                return;
              });
            message.reply(`Channel: ${channelMention.name} removed from blocktext list.`);
          } else {
            message.reply(`Channel not found`);
          }
        }).catch();
        break;
    }
  }
};
