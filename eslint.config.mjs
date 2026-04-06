import { recommend } from '@x-devtools/eslint';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
	...recommend,
	{
		name: 'Custom Config',
		files: [
			'vite.config.ts',
			'syncpack.config.ts',
			'eslint.config.mjs',
			'.prettierrc.mjs',
			'turbo',
		],
	},
	{
		ignores: ['turbo/generators/templates'],
	},
];
