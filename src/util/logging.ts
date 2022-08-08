const winston = require('winston');
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const formatConsole = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    // Tell Winston that the logs must be colored
    winston.format.colorize({all: true}),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const formatFile = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'http',
            format: formatConsole,
        }),
        new winston.transports.File({
            filename: 'logs/server.log',
            format: formatFile,
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/error.log'
        }),
    ],
    level: 'debug',
    levels,
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}
winston.addColors(colors)
export const logger = winston.createLogger(logConfiguration);