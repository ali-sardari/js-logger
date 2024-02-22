const { white, magenta, cyan, yellow, red } = require("colors");

class Logger {
    constructor(tag = "MyTag") {
        this.tag = tag;
    }

    //-------------------------------------------------------------------------------------
    d(message, ...optionalParams) {
        this.log("D", message, ...optionalParams);
    }

    i(message, ...optionalParams) {
        this.log("I", message, ...optionalParams);
    }

    w(message, ...optionalParams) {
        this.log("W", message, ...optionalParams);
    }

    e(message, ...optionalParams) {
        this.log("E", message, ...optionalParams);
    }

    //-------------------------------------------------------------------------------------
    log(level, message, ...optionalParams) {
        if (typeof message !== "string") {
            optionalParams = [message, ...optionalParams];
            message = undefined;
        }

        let msg = `${this.getDateTime()} [${level}] ${this.tag} -> `;

        let l = console.info;
        let c = white;

        switch (level) {
            case "D":
                l = console.debug;
                c = magenta;
                break;
            case "I":
                l = console.info;
                c = cyan;
                break;
            case "W":
                l = console.warn;
                c = yellow;
                break;
            case "E":
                l = console.error;
                c = red;
                break;
        }

        if (message !== undefined) {
            msg += message;
        }

        l(c(msg), ...optionalParams);
    }

    //-------------------------------------------------------------------------------------
    getDateTime() {
        const now = new Date();
        const formattedDate = now
            .toISOString()
            .replace("T", " ")
            .replace(/\.\d+Z$/, "");

        const millis = String(now.getMilliseconds()).padStart(3, "0");
        return `${formattedDate}.${millis}`;
    }
}

//-------------------------------------------------------------------------------------
const logger = new Logger("MyTag");
module.exports = logger;
