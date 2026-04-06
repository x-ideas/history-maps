// import importPlugin from 'eslint-plugin-import';
import * as tsParser from '@typescript-eslint/parser';
// import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as importX from 'eslint-plugin-import-x';
import { createNodeResolver } from 'eslint-plugin-import-x';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	{
		files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'import-x/no-deprecated': ['error'],
			'import-x/no-duplicates': ['error'],
			'import-x/no-extraneous-dependencies': [
				'error',
				{
					// non src folder can import devDependencies
					devDependencies: ['!**/src/**'],
					whitelist: ['vitest'],
				},
			],
			'import-x/no-cycle': [
				'error',
				{
					ignoreExternal: true,
				},
			],
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			// 'import-x/extensions': ['error', 'ignorePackages'],
			'import-x/order': [
				'error',
				{
					'newlines-between': 'always',
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					alphabetize: {
						order:
							'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
						caseInsensitive: true /* ignore case. Options: [true, false] */,
					},
					named: {
						enabled: true,
					},
				},
			],
		},
		settings: {
			'import-x/resolver-next': [
				// createTypeScriptImportResolver({
				// 	// NOTE: 项目需要有个 tsconfig.json 文件
				// 	project: './tsconfig.json',
				// }),
				createNodeResolver({
					extensions: [
						'.ts',
						'.tsx',
						'.cts',
						'.mts',
						'.mjs',
						'.cjs',
						'.js',
						'.jsx',
						'.json',
						'.node',
					],
					mainFiles: ['index'],
				}),
			],
		},
	},
];
export default eslintConfig;
