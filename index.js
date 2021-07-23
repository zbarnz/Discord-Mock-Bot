const { token, prefix } = require("./config.json");
const Discord = require("discord.js");
const { createRequireFromPath } = require("module");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot is Online");
});

let victims = [];
addVictims();

function addVictims() {
  client.on("message", (message) => {
    if (
      !message.content.startsWith(`${prefix}repeat`) &&
      !message.content.startsWith(`${prefix}stoprepeat`)
    ) {
      repeat(victims, message);
      return;
    }

    const command = message.content
      .slice(prefix.length)
      .trim()
      .split(" ")
      .shift()
      .toLowerCase();

    if (command === "repeat") {
      if (!message.mentions.users.size) {
        return message.reply("you need to tag a user.");
      }

      message.mentions.users.map((user) => {
        victims.push(user);
        message.channel.send(`I will repeat ${user}`);
      });
    }
    if (command === "stoprepeat") {
      if (!message.mentions.users.size) {
        return message.reply("you need to tag a user.");
      }

      message.mentions.users.map((user) => {
        const index = victims.indexOf(user);
        if (index > -1) {
          victims.splice(index, 1);
          message.channel.send(`I will stop repeating ${user}`);
        } else {
          message.channel.send(`I was not repeating ${user}`);
        }
      });
    }
  });
}

function repeat(victims, message) {
  if (victims.includes(message.author)) {
    message.channel.send(message.toString().replace(/[a-z]/gi, (c) => c[`to${(message = !message) ? "Low" : "Upp"}erCase`]()));
  }
}

client.login(token);
