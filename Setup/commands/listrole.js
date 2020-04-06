const Discord = require('discord.js');
exports.run = (Bot, message, args) => {

  //Check for Admin Perms
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let roleMention = message.mentions.roles;

    //Look if the User did something wrong and if he did return an error!
    if (!roleMention.first())
      return message.channel.send('You forgot some parameters! Look at the help!').then(msg => msg.delete(5000));

    roleMention.forEach((checkRole) => {
      let embed = new Discord.RichEmbed();
      embed.setTitle(`Users with role: ${checkRole.name}`);
      const guildUsers = message.guild.members;
      guildUsers.forEach((checkUser) => {
        if (checkUser.roles.has(checkRole.id)) {
          message.channel.send(`${checkUser.user.tag}`);
        }
      });
    });
  }
};
