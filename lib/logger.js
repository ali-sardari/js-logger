const colors = {
    "error": '\x1b[91m',
    "debug": '\x1b[92m',
    "warning": '\x1b[93m',
    "info": '\x1b[96m',
    "trace": '\x1b[37m',
    "reset": '\x1b[0m'
}

function applyColor(color, text) {
    return color + text + colors.reset;
}

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

        console.log(applyColor(colors.trace, formattedMessage));
        filteredStackTrace.forEach(frame => console.log(applyColor(colors.trace, frame)));
    }

    d(message, ...optionalParams) {
        this._log("D", message, colors.debug, console.debug, ...optionalParams);
    }

    i(message, ...optionalParams) {
        this._log("I", message, colors.info, console.info, ...optionalParams);
    }

    w(message, ...optionalParams) {
        this._log("W", message, colors.warning, console.warn, ...optionalParams);
    }

    e(message, ...optionalParams) {
        this._log("E", message, colors.error, console.error, ...optionalParams);
    }

    _log(level, message, color, logFunction, ...optionalParams) {
        if (typeof message !== "string") {
            optionalParams = [message, ...optionalParams];
            message = undefined;
        }

        const formattedMessage = this._formatMessage(level, message);

        logFunction(applyColor(color, formattedMessage), ...optionalParams);
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
