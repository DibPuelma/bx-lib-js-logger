import winston from 'winston';
import type { LogLevel, LogPayload, LogMetadata, AppData, Config, ErrorPayload } from './types.d.ts';


class Logger {
  private logger: winston.Logger | null = null;
  private application_id: string = '';
  private subdomain: string = '';
  private log_level: LogLevel | null = null;
  config({ application_id, subdomain, log_level }: Config) {
    if (!application_id) {
      throw new Error('application_id is required');
    }
    if (!subdomain) {
      throw new Error('subdomain is required');
    }
    this.application_id = application_id;
    this.subdomain = subdomain;
    this.log_level = log_level || process.env.BX_LOG_LEVEL?.toLocaleLowerCase() as LogLevel || 'error';
    this.logger = winston.createLogger({
      level: this.log_level, // Nivel de log por defecto
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS ZZ' }), // Formato UTC
        winston.format.json() // Formato JSON
      ),
      transports: [
        new winston.transports.Console() // Salida a consola
      ]
    });
  }
  // Función principal para loguear
  log({
    level,
    transaction_id,
    message,
    errorType,
    context,
  }: LogPayload) {
    if (!this.logger || !this.log_level) {
      throw new Error('Logger not configured, use logger.config() before logging');
    }
    let parsedType = errorType;
    if (!parsedType) {
      parsedType = 'info';
    }
    if (!message) {
      throw new Error('message is required');
    }

    // Asegura que los metadatos estén en un objeto
    const metadata: LogMetadata & AppData = {
      errorType: parsedType,
      transaction_id,
      application_id: this.application_id,
      subdomain: this.subdomain,
      timestamp: new Date().toISOString(),
      context,
    };

    // Loguea el mensaje con los metadatos
    this.logger.log(level || this.log_level, message, metadata);
  }

  // Función principal para loguear
  warn({
    transaction_id,
    message,
    errorType,
    context,
  }: LogPayload) {
    if (!this.logger || !this.log_level) {
      throw new Error('Logger not configured, use logger.config() before logging');
    }
    let parsedType = errorType;
    if (!parsedType) {
      parsedType = 'info';
    }
    if (!message) {
      throw new Error('message is required');
    }

    // Asegura que los metadatos estén en un objeto
    const metadata: LogMetadata & AppData = {
      errorType: parsedType,
      transaction_id,
      application_id: this.application_id,
      subdomain: this.subdomain,
      timestamp: new Date().toISOString(),
      context,
    };

    // Loguea el mensaje con los metadatos
    this.logger.warn(message, metadata);
  }

  // Función principal para loguear
  error({
    transaction_id,
    message,
    errorType,
    context,
  }: ErrorPayload) {
    if (!this.logger || !this.log_level) {
      throw new Error('Logger not configured, use logger.config() before logging');
    }
    if (!errorType) {
      throw new Error('errorType is required when logging errors');
    }

    // Asegura que los metadatos estén en un objeto
    const metadata: LogMetadata & AppData = {
      errorType,
      transaction_id,
      application_id: this.application_id,
      subdomain: this.subdomain,
      timestamp: new Date().toISOString(),
      context,
    };

    // Loguea el mensaje con los metadatos
    this.logger.error(message, metadata);
  }

}

export default new Logger();
export {
  LogLevel,
  LogPayload,
  LogMetadata,
  AppData,
  Config
}