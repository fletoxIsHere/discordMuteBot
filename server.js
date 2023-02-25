const {
    Client,
    GatewayIntentBits
} = require("discord.js");
const
    dotenv = require("dotenv");

dotenv.config()
const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration,
    ],
});

console.log("Starting...");

client.on("ready", () => {
    console.log(`the bot is online!`);
});



client.on("messageCreate", (message) => {

    let muteRole = message.member.roles.cache.find(role => role.name === "Mute");
    const channel = client.channels.cache.get(message.member.voice.channelId)


    if (!muteRole && !message.member.user.bot && message.content.startsWith("$mute")) {
        return message.reply({
            content: "khassk role <Mute>"
        })

    }
    if (message.content === "$mute voice") {
        channel.members.forEach(user => user.voice.setMute(true))

    }
    if (message.content == "$unmute voice") {
        channel.members.forEach(user => user.voice.setMute(false))
    }



});

client.login(token);