import svelte from 'eslint-plugin-svelte';
import { parser as tsParser } from 'typescript-eslint';

/**
 * @params {any} svelteConfig - Svelte config object, imported from svelte.config.js
 * @returns {import('eslint').Linter.Config[]}
 */
function factory(svelteConfig) {
	return [
		...svelte.configs.recommended,
		{
			name: 'svelte-config',
			files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
			languageOptions: {
				parserOptions: {
					parser: tsParser,
					svelteConfig,
				},
			},
		},
	];
}
export default factory;
