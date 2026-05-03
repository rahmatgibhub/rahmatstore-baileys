
const fs = require("fs");
const pino = require("pino");
const readline = require("readline");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

console.clear();
console.log(`
██████╗  █████╗ ██╗██╗     ███████╗██╗   ██╗███████╗
██╔══██╗██╔══██╗██║██║     ██╔════╝╚██╗ ██╔╝██╔════╝
██████╔╝███████║██║██║     █████╗   ╚████╔╝ ███████╗
██╔══██╗██╔══██║██║██║     ██╔══╝    ╚██╔╝  ╚════██║
██████╔╝██║  ██║██║███████╗███████╗   ██║   ███████║
╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝
BAILEYS BY RAHMAT STORE
`);

async function start() {
 const { state, saveCreds } = await useMultiFileAuthState("./session");
 const sock = makeWASocket({
   auth: state,
   logger: pino({ level: "silent" }),
   browser: ["RahmatStore","Chrome","1.0"]
 });

 sock.ev.on("creds.update", saveCreds);

 if(!state.creds.registered){
   const rl = readline.createInterface({input:process.stdin,output:process.stdout});
   rl.question("Masukkan nomor WhatsApp (628xx): ", async (num)=>{
      const code = await sock.requestPairingCode(num.trim());
      console.log("Kode Pairing:", code);
      rl.close();
   });
 }
}
start();
