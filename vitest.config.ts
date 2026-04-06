import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: ['packages/*', 'features/*', 'apps/*'],
		coverage: {
			provider: 'v8',
		},
	},
});
