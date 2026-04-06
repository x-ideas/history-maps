import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	{
		name: 'browser-env',
		languageOptions: {
			globals: {
				...globals.browser,
				// ...globals.node, // Add this if you are using SvelteKit in non-SPA mode
			},
		},
	},
];
export default eslintConfig;
