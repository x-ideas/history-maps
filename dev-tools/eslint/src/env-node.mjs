import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	{
		name: 'node-env',
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
export default eslintConfig;
