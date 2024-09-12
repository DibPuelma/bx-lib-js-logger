export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'critical'
export type LogError = 'info' | 'error' | 'database' | 'business' | 'integration'
export type AppData = {
  application_id: string;
  subdomain: string;
}
export type Config = AppData & {
  log_level?: LogLevel;
}

export type LogMetadata = {
  transaction_id?: string;
  errorType?: LogError;
  context?: any;
  timestamp: string;
};

export type LogPayload = {
  level?: LogLevel;
  message: string;
  transaction_id?: string;
  errorType?: LogError;
  context?: any;
};

export type ErrorPayload = {
  message: string;
  transaction_id?: string;
  errorType: LogError;
  context?: any;
};