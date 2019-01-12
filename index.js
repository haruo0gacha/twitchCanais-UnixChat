var tmi = require('tmi.js');
var readline = require('readline');
var https = require('https');

var canais = [];
var client = null;



executar_canais();
conectar();
client.action("johnpittertv", "/w johnpittertvbot !bonus");

setInterval(function(){

    canais = [];

    client.disconnect();

    executar_canais();
    conectar();
	
	client.action("johnpittertv", "/w johnpittertvbot !bonus");

}, 30 * 60 * 1000);

function executar_canais() {
    var site = https.get("https://raw.githubusercontent.com/unixcf/twitchCanais-UnixChat/master/canais%2Ctxt", function(pagina) {
    var github = readline.createInterface({
      input: pagina
    });
    github.on('line', (line) => {
      canais.push(line);
    }).on('close', () => {
      console.log(canais);
    });
  });
  }

function conectar() {
    var options = {
        options: {
            debug: true
        },
        connection: {
            cluster: "aws",
            reconnect: true
        }, 
        identity: {
            username: "twitch_conta",
            password: "oauth"
        },
        channels: canais
    };
    
    client = new tmi.client(options);
    client.connect();
    
    client.on("connected", function (address, port) {
        console.log("Conectado...");
    });
    
}
