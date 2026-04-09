import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sirv from 'sirv';
import { defineConfig } from 'vite';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(appDir, 'build');

export default defineConfig({
	plugins: [
		{
			name: 'serve-build-dir',
			enforce: 'pre',
			configureServer(server) {
				server.middlewares.use('/build', sirv(buildDir, { dev: true }));
			},
		},
	],
});
