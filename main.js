const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

try {
    var Config = require('./config').Config;
  } catch(error) {
    console.log('erreur');
}

client.on('ready', () => {
	console.log(`Connecté ${client.user.tag}!`);
  pingForPlayers()
  setInterval(pingForPlayers, Math.max(1, 1 || 1) * 60 * 1000) // refresh chaque 60 secondes
});

function pingForPlayers() {

	axios.get(`https://api.mcsrvstat.us/1/${Config.ServerIp}`).then(res => {
		if(res.data && res.data.players) {
			let playerCount = res.data.players.online || 0
      let playerCountMax = res.data.players.max || 0
      client.user.setActivity(`${playerCount}/${playerCountMax} joueur(s) en ligne`, {
        type: 'WATCHING'
      })
		}
		else
			console.log('Impossible de ping l\'ip', Config.ServerIp)

	}).catch(err => console.log('Erreur du ping sur api.mcsrvstat.us pour :', err))
}

client.login(Config.token);
