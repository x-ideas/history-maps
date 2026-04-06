import type { Logger } from './type';
export { Logger };

// define different levels of colors and styles
const logStyles = {
	info: {
		color: '',
	},
	error: {
		color: '#FF4444', // red
	},
	warn: {
		color: '#FF8800', // orange
	},
	debug: {
		color: '#2196F3', // blue
	},
} as const;
const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, '0');

function logFunc(level: keyof typeof logStyles, ...args: unknown[]) {
	const now = new Date();
	const tzOffset = -now.getTimezoneOffset();
	const diff = tzOffset >= 0 ? '+' : '-';

	const tz = diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
	const timestamp =
		now.getFullYear() +
		'-' +
		pad(now.getMonth() + 1) +
		'-' +
		pad(now.getDate()) +
		'T' +
		pad(now.getHours()) +
		':' +
		pad(now.getMinutes()) +
		':' +
		pad(now.getSeconds()) +
		'.' +
		String(now.getMilliseconds()).padStart(3, '0') +
		tz;

	return console[level].bind(
		console,
		`%c [${level}] ${timestamp}`,
		`color: ${logStyles[level].color};`,
		...args,
	);
}

export const logger: Logger = {
	info: logFunc('info'),
	error: logFunc('error'),
	warn: logFunc('warn'),
	debug: logFunc('debug'),
};

/**
 * create a logger with additional info
 * @example
 * ```ts
 * const logger = createLogger('[demo]');
 * logger.info('Hello World from browser'); // will be logged as [demo] Hello World from browser
 * ```
 */
export function createLogger(bindings: Record<string, unknown>): Logger {
	return {
		info: logFunc('info', bindings),
		error: logFunc('error', bindings),
		warn: logFunc('warn', bindings),
		debug: logFunc('debug', bindings),
	};
}
