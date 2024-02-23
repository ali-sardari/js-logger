# Logger

[![npm version](https://badge.fury.io/js/x-logify.svg)](https://badge.fury.io/js/x-logify)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A versatile and colorful logging utility for Node.js applications. Simplify debugging, improve log readability, and enhance your development experience with different log levels, including trace, debug, info, warn, and error. Powered by ANSI color codes for a visually appealing console output.

## Installation

Install the Logger library using npm:

```bash
npm install logger
```

## Usage
````js
const logger = require("./logger");

// Log messages with different levels
logger.trace('This is a trace message');
logger.d('Debugging information');
logger.i('Informational message');
logger.w('Warning message');
logger.e('Error message');
````

