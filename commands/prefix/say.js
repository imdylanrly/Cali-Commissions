module.exports = {
    name: "say",

    async execute(message, args) {
        const REQUIRED_ROLE_ID = "1490556334142390322";

        const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
        const isAdmin = message.member.permissions.has("Administrator");

        if (!hasRole && !isAdmin) {
            return message.reply("You do not have permission to use this command.")

        }

        const text = args.slice(0).join(" ")

        await message.delete();
        await message.channel.send(text)
    }
}