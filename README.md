Para usar esta librería existen dos formas. Creando un Servicio en Nest o importándola directamente.

La librería utilizara por defecto el valor de entorno de la variable `BX_LOG_LEVEL` de cada proyecto. Si esta variable no existe, por defecto se usa `info`

### Usando un servicio de Nest

Crear el servicio

```jsx
// logger.service.ts
import { Injectable } from '@nestjs/common';
import loggerLib from 'bx-lib-js-logger'; // Asegúrate de que el nombre del paquete sea correcto
import { LogError, LogLevel } from 'bx-lib-js-logger/types';

@Injectable()
export class CustomLoggerService {
  private readonly logger = customLogger;
  constructor() {
    this.logger.config({
      application_id: 'bx-containers-so-validation-service',
      subdomain: 'opbase',
    })
  }

  log({
    level,
    transaction_id,
    message,
    errorType,
    context,
  }: {
    level?: LogLevel;
    transaction_id?: string;
    message: string;
    errorType: LogError;
    context?: any,
  }) {
    this.logger.log({
      level,
      transaction_id,
      message,
      errorType,
      context,
    })
  }
}
```

Importarlo en el módulo

```jsx
import { CustomLoggerService } from './logger.service';

@Module({
	...
  providers: [CustomLoggerService],
})
```

### Importando la librería directamente

Primero se debe realizar la configuración en el punto de inicio de la aplicación

En `main.ts` 

```jsx
import logger from 'bx-lib-js-logger';

async function bootstrap() {
	...
	
  logger.config({
    application_id: 'bx-container-so-validation-service',
    subdomain: 'opbase',
  })
  
  ...
}
```

Luego se puede utilizar directamente.

```jsx
import logger from 'bx-lib-js-logger';
logger.log({
      message: 'Error while getting templates',
      errorType: 'database',
      context: {
        userId: 10,
        name: 'Javier',
      },
      transaction_id: '209309402',
    })
```