const Discord = require('discord.js');
const Config = require('./config.js');
const chalk = require('chalk');
const Database = require('./Setup/database/db.js');
const fs = require('fs');

// Creating the discord client
const client = new Discord.Client();

// Attaching the sqlite database to the client
client.sql = Database.sql;
client.database = Database;

// Attaching the config to the client
client.config = Config;


client.on('ready', () => {
  console.log(chalk.bgBlue.white(`Logged in as ${client.user.tag}\n${client.guilds.size} servers!`));


  client.user.setActivity(`${Config.Prefix}help`, {
    type: "LISTENING"
  });

  // Creating the tables for the database
  client.sql.run(`CREATE TABLE IF NOT EXISTS blocktext (ServerId TEXT, ChannelId TEXT)`);
});

client.on('error', console.error);

client.on('message', function(message) {
  const msgUpper = message.content.toUpperCase();
  // Don't listen to a bot!!
  if (message.author.bot) return;

  // If the guild/server isn't available
  if (message.guild.available != true) return;

  client.sql.all(`SELECT * FROM blocktext WHERE ServerId = ?`, [message.guild.id]).then((ret)=> {
    ret.forEach((check) => {
      if (check.ChannelId === message.channel.id) {
        if(message.attachments.first() === undefined) {
          message.delete();
        }
      }
    });
  });

  // If message didn't start with the prefix, then stop it here
  if (!message.content.toLowerCase().startsWith(client.config.Prefix)) return;

  // Removes the prefix from the message, before "slicing" it up to an array ['like', 'this']
  const args = message.content.slice(client.config.Prefix.length).trim().split(/ +/g);

  // The command
  const command = args.shift().toLowerCase();

  fs.exists(`./Setup/commands/${command}.js`, (exists) => {
    if(exists) {
      let fetchCommand = require(`./Setup/commands/${command}.js`);
      fetchCommand.run(client, message, args);
    }
  });
});

// Logging in to the client with the token
client.login(Config.Token);
