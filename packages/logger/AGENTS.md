# @x-pkg/logger Agent

logger for node and browser.
You should use this logger in your project instead of console or other looger.

## features
* support node and browser
* support different levels of logs

## usage
```ts

// node
import { logger	} from '@x-pkg/logger/node';
logger.info('Hello World from node');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.debug('This is a debug message');

// browser
import { logger	} from '@x-pkg/logger/browser';
logger.info('Hello World from browser');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.debug('This is a debug message');


// bind context info
import { createLogger	} from '@x-pkg/logger/browser';
const logger = createLogger({ file: 'demo.tsx' });
logger.info('Hello World from browser');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.debug('This is a debug message');


import { createLogger	} from '@x-pkg/logger/node';
const logger = createLogger({ file: 'demo.tsx' });
logger.info('Hello World from node');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.debug('This is a debug message');
```


### entry points
```json
{
	"exports": {
		"./node":  "./src/node.ts",
		"./browser": "./src/browser.ts"
	}
}
```
| entry point | description    | remark |
| ----------- | -------------- | ------ |
| ./node      | node logger    |        |
| ./browser   | browser logger |        |

