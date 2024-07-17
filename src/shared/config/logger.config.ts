import winston from "winston";

export const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.cli()
    ),
    transports: [
      new winston.transports.Console(),
      // Add additional transports like file or database here
    ],
  });
  