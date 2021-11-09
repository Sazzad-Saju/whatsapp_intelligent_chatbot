//whatsapp_intelligent_chatbot
// (c)-2021-[Sazzad-Saju]

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

// Get QR code to scan WhatsAPP
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    console.log(message.body);
});

//Contact-List to Reply
var contact = [
    { name: "Saju", phnNo: "01628190468" },
    { name: "Raktim", phnNo: "01704663145" }
]

client.on('message', message => {
    var userID = message.from;
    var re = /(01){1}[0-9]{9}/;
    var Getphone = userID.match(re);
    Getphone = Getphone[0];
    //match contact
    var matchPhone = contact.find(phn => {
        if (phn.phnNo === Getphone) {
            return true
        }
    })
    if (matchPhone) {
        var selectedData = false;
        var targetMsg;
        var str = message.body;
        //list of auto replies
        if (/Hello/i.test(str)) {
            selectedData = true;
            targetMsg = 'Hi';
        } else if (/salam/i.test(str)) {
            selectedData = true;
            targetMsg = 'Walaikum Salam';
        } else if (/what's up/i.test(str)) {
            selectedData = true;
            targetMsg = "Nothing much! What's up to you?";
        } else if (/Sorry/i.test(str)) {
            selectedData = true;
            targetMsg = 'No problem';
        } else if (/Call/i.test(str)) {
            selectedData = true;
            targetMsg = 'Please leave a voicemail. Let us connect in an hour. Kind Reards, Sazzad Saju';
        } else if (/Thank/i.test(str)) {
            selectedData = true;
            targetMsg = 'Welcome';
        } else if (/Hi/i.test(str)) {
            selectedData = true;
            targetMsg = 'Hello!';
        } else if (/Hey/i.test(str)) {
            selectedData = true;
            targetMsg = 'Hello!';
        } else if (/Help/i.test(str)) {
            selectedData = true;
            targetMsg = 'Please mail me for any queries at sazzadsaju17@gmail.com.';
        } else {
            targetMsg = 'Sorry I am not available right now. Catch you later. Kind Reards, Sazzad Saju';
        }

        if (selectedData) {
            message.reply(targetMsg);
        } else {
            message.reply(targetMsg);
        }
    }
});
client.initialize();