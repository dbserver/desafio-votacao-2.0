import winston from 'winston'

abstract class LoggerInstance {
    static logger : winston.Logger
}

if (!LoggerInstance.logger) {
    LoggerInstance.logger = winston.createLogger({
        transports: [
            // new winston.transports.File({
            //     filename: './logs/error.log',
            //     level: 'error',
            //     format: winston.format.json(),
            //     handleExceptions: true,
            //     maxsize: 104857600,
            //     maxFiles: 5
            // }),
            new winston.transports.File({
                filename: './logs/logger.log',
                level: 'info',
                format: winston.format.json(),
                maxsize: 104857600,
                maxFiles: 5,
            })
        ]
    });
}
const logger = LoggerInstance.logger
export default logger