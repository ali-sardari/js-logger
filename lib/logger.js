const _filename = "Logger"
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
        const filteredStackTrace = stackTraceFrames.filter(frame => !frame.includes(_filename));

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
        // Create an Error object to capture the stack trace
        const err = new Error();

        // Extract the stack trace frames
        const stackTraceFrames = err.stack.split('\n').slice(2);

        // Find the first frame not related to the Logger class
        const callerFrame = stackTraceFrames.find(frame => !frame.includes(_filename));

        let path = "";
        try {
            // Extract file name and line number from the caller frame
            const [fileName, lineNumber] = callerFrame.match(/\/([^/]+):(\d+):(\d+)/).slice(1, 3);
            path = this.fileNameWithLine(fileName + ":" + lineNumber);
        } catch (e) {
            // console.log(e);
        }

        const dateTime = this._getDateTime();
        return `${dateTime} [${level}] ${this.tag} (${path}) -> ${message || ""}`;
    }

    _getDateTime() {
        const now = new Date();
        const formattedDate = now.toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
        const millis = String(now.getMilliseconds()).padStart(3, "0");
        return `${formattedDate}.${millis}`;
    }

    fileNameWithLine(inputString) {
        const matchResult = inputString.match(/([^/?]+)\?t=\d+:(\d+)/);

        if (matchResult) {
            // Extract the file name and line number
            const [fullFileName, lineNumber] = matchResult.slice(1, 3);

            // Get only the base file name
            const fileName = fullFileName.split('/').pop();

            // Concatenate the result
            return `${fileName}:${lineNumber}`;
        } else {
            return "";
        }
    }
}

module.exports = new Logger();
