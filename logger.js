const colors = require("colors");

class Logger {
    constructor(tag = "LOGGER") {
        this.tag = tag;
    }

    trace(message) {
        const formattedMessage = this._formatMessage("T", message);

        // Create an Error object to capture the stack trace
        const error = new Error();

        // Extract the stack trace frames
        const stackTraceFrames = error.stack.split('\n').slice(2);

        // Filter out frames related to the Logger class
        const filteredStackTrace = stackTraceFrames.filter(frame => !frame.includes(__filename));

        console.log(colors.gray(formattedMessage));
        filteredStackTrace.forEach(frame => console.log(colors.gray(frame)));
    }

    d(message, ...optionalParams) {
        this._log("D", message, colors.magenta, console.debug, ...optionalParams);
    }

    i(message, ...optionalParams) {
        this._log("I", message, colors.cyan, console.info, ...optionalParams);
    }

    w(message, ...optionalParams) {
        this._log("W", message, colors.yellow, console.warn, ...optionalParams);
    }

    e(message, ...optionalParams) {
        this._log("E", message, colors.red, console.error, ...optionalParams);
    }

    _log(level, message, color, logFunction, ...optionalParams) {
        if (typeof message !== "string") {
            optionalParams = [message, ...optionalParams];
            message = undefined;
        }

        const formattedMessage = this._formatMessage(level, message);

        logFunction(color(formattedMessage), ...optionalParams);
    }

    _formatMessage(level, message) {
        const dateTime = this._getDateTime();
        return `${dateTime} [${level}] ${this.tag} -> ${message || ""}`;
    }

    _getDateTime() {
        const now = new Date();
        const formattedDate = now.toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
        const millis = String(now.getMilliseconds()).padStart(3, "0");
        return `${formattedDate}.${millis}`;
    }
}

module.exports = new Logger();
