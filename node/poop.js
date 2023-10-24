const https = require('https');

class Bot {
    constructor() {
        this.url = "https://api.telegram.org/botYOUR_BOT_TOKEN/"; // Replace with your bot token
        this.feel = 0;
        this.offset = 967879255 + 1;
    }

    getUpdatesJson() {
        const params = { timeout: 100, offset: this.offset };
        const url = this.url + 'getUpdates?timeout=' + params.timeout + '&offset=' + params.offset;
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const date = JSON.parse(data);
                        if (date.ok) {
                            if (date.result !== null) {
                                resolve(date.result[date.result.length - 1]);
                            } else {
                                resolve(null);
                            }
                        } else {
                            console.error('Not connection');
                            reject(new Error('Not connected'));
                        }
                    } catch (error) {
                        console.error('Error parsing JSON', error);
                        reject(error);
                    }
                });
            });
        });
    }

    sendMess(chat, text) {
        const form = `chat_id=${chat}&text=${text}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const url = this.url + 'sendMessage';
        const req = https.request(url, options, (res) => {
            res.on('data', () => {});
        });
        req.write(form);
        req.end();
    }

    sendMassageJson(data) {
        try {
            const chatId = data.message.chat.id;
            const textServ = data.message.text;
            let text = "";

            if (textServ === '/start') {
                text = "Hi, I can help you find a film! Can you sign up?";
            } else if (textServ === '/signup') {
                text = "What is your name?";
                this.feel = 1;
            } else if (textServ === '/link') {
                text = "Film link from kinopoisk:";
                this.feel = 2;
            } else if (this.feel === 1 && textServ !== '/signup') {
                text = "Nice to meet you, " + textServ;
                this.feel = 0;
            } else if (this.feel === 2 && textServ !== '/link') {
                const isLink = /^https:\/\/www\.kinopoisk\.ru\/[a-zA-Z]+\/[0-9]+\/$/.test(textServ);
                if (isLink) {
                    text = "Your link: " + textServ.replace('kinopoisk', 'sspoisk');
                } else {
                    text = "Invalid URL. Please send a valid link.";
                }
                this.feel = 0;
            } else {
                text = "I don't understand this command, try again";
            }

            this.sendMess(chatId, text);
        } catch (error) {
            console.error('Error', error);
        }
    }
}

async function main() {
    const bot = new Bot();
    try {
        const update = await bot.getUpdatesJson();
        if (update === null) {
            return;
        }
        let updateId = update.update_id;
        while (true) {
            const currentUpdate = await bot.getUpdatesJson();
            if (updateId === currentUpdate.update_id) {
                bot.sendMassageJson(currentUpdate);
                bot.offset = updateId + 1;
                updateId += 1;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error(error);
    }
}

if (require.main === module) {
    main();
}
