const qrcode = require("qrcode-terminal");
const axios = require("axios");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code to start this whatsapp bot");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  const content = message.body;
  if (
    content === "!Hii" ||
    content === "!hii" ||
    content === "!Hi" ||
    content === "!hi" ||
    content === "!Hello" ||
    content === "!Hello!" ||
    content === "!hello" ||
    content === "!hello!" ||
    content.toLowerCase() === "cricbuzz_mate" ||
    content.toLowerCase() === "!cricbuzz_mate" ||
    content.toLowerCase() === "!cricbuzz mate" ||
    content.toLowerCase() === "!cricbuzz"
  ) {
    message.reply(
      `Hello! I am your *Cricbuzz Mate*🏏\nI will tell you *Live Cricket Score*\nJust type *!Score* or *!score*`
    );
  } else if (content.toLowerCase() === "!score") {
    const response = await axios(
      "https://cricbuzz-basic-api-by-subrata.onrender.com/basic"
    ).then((res) => res.data);
    let scoreMsg = `*LIVE SCORE BY Cricbuzz_Mate🏏*\n\n`;

    response.forEach((match) => {
      let row = "";
      row += `Match: ${match.Match}\n`;
      row += `Title: ${match.Title}\n`;
      row += `${match.Score}\n`;
      row += `\n`;
      scoreMsg += row;
    });
    scoreMsg +=
      "\n*Data Source:* https://cricbuzz-basic-api-by-subrata.onrender.com/\n*API details:* https://github.com/Subrata-Rudra/cricbuzz-basic-api";
    message.reply(scoreMsg);
  } else if (content.toLowerCase() === "!developer") {
    message.reply(
      `*Developer*🧑‍💻: Subrata Rudra\n*Source Code📁:* https://github.com/Subrata-Rudra/crickbuzz_mate-whatsapp-bot\n*Subrata's GitHub:* https://github.com/Subrata-Rudra\n*Subrata's LinkedIn:* https://www.linkedin.com/in/subrata-rudra-b481741b7/`
    );
  } else if (content[0] === "!") {
    message.reply(`_*Invalid Command*_🚫`);
  }
});

client.initialize();
