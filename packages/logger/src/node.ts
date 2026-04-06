import pino from 'pino';

import type { Logger } from './type';
export { Logger };

export const logger: Logger = pino({});

export function createLogger(bindings: Record<string, unknown>): Logger {
	return pino({}).child(bindings);
}
