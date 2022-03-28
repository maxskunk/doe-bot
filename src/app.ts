import * as tmi from 'tmi.js';
import { config } from 'dotenv';
config({ path: __dirname + './../.env' });


const rymingWords: string[] = [
    "so",
    "know",
    "no",
    "go",
    "low",
    "show",
    "flow",
    "grow",
    "row",
    "snow",
    "pro",
    "dough",
    "bro",
];

const channel = process.env.CHANNEL;
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
    channels: [channel]
});

export class App {
    constructor() {
        console.log("Doe Bot is Listening to the " + channel + " twich channel");
        client.connect().catch(console.error);
        client.on('message', (channel, tags, message, self) => {
            if (self) return;
            if (message.toLowerCase() === '!hello') {
                client.say(channel, `@${tags.username},  disast56PixelDoe heya!`);
            }
            this.checkForRhymingWords(message);
            if (message.toLowerCase().includes('doe')) {
                //this.handleDoe();
            }

        });
    }

    public handleDoe() {
        client.say(channel, `Bleat!`);
    }

    public checkForRhymingWords(message) {
        const msg = message.toLowerCase();
        const msgArray = msg.split(' ');

        const wordReplacementIndexs: number[] = []
        msgArray.forEach((word, index) => {
            if (rymingWords.indexOf(word) !== -1) {
                console.log("Found Ryhming Word '" + word + "'");
                wordReplacementIndexs.push(index);
            }
        });

        if (wordReplacementIndexs.length > 0) {
            let returnString = "";
            const messageArray = message.split(' ');
            messageArray.forEach((word, index) => {
                if (wordReplacementIndexs.indexOf(index) !== -1) {
                    returnString += ' DOE';
                }
                else {
                    returnString += ' ' + word;
                }
            });
            client.say(channel, returnString);
        }
    }
}
const app = new App();