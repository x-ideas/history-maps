/* eslint-disable no-restricted-syntax */
import chalk from 'chalk';
import {
	descriptionPrompt,
	getInfoFromType,
	namePrompt,
} from '../utils/common-prompt';
import type { PlopTypes } from '@turbo/gen';

type Answers = {
	/**
	 * package type，
	 */
	readonly type: 'package' | 'app' | 'feature';
	/**
	 * package name, in kebab-case (e.g., my-package)
	 */
	readonly name: string;

	/**
	 * package description
	 */
	readonly description: string;

	/**
	 * confirm to create the package
	 */
	readonly confirm: boolean;

	/**
	 * framework
	 */
	readonly framework: 'nextjs' | 'remix';

	/**
	 * additional dependencies to include in the package.json
	 */
	readonly dependencies: string[];

	/**
	 * full package name with scope (e.g., @scope/name)
	 *
	 * dynamically set during generation
	 */
	packageName: string;
};

export function createNextjsAppGenerator(plop: PlopTypes.NodePlopAPI) {
	plop.setGenerator('nextjs', {
		description: 'Generate nextjs app',
		prompts: [
			namePrompt(),
			descriptionPrompt(),
			{
				type: 'confirm',
				name: 'confirm',
				message: (answers) => {
					// default to app
					answers.type = 'app';

					const { packageName, scope, packageFolder } = getInfoFromType(
						answers as Answers,
					);
					console.log('\n');
					console.log('====================');
					console.log(chalk.redBright(`Package Summary`));
					console.log(`- Package Name: ${packageName}`);
					console.log(`- Scope: ${scope}`);
					console.log(`- Folder: ${packageFolder}`);
					console.log(
						`- Framework: ${(answers as Answers).framework || 'N/A'}`,
					);
					console.log(`${chalk.redBright('====================')}`);

					return `\n\nContinue?`;
				},
				default: true,
			},
		],
		actions(data) {
			const answers = data as Answers;
			if (!answers.confirm) {
				console.log('Package creation cancelled.');
				return [];
			}

			const { packageName, packageFolder } = getInfoFromType(answers);

			// calculate computed answers
			answers.packageName = packageName;

			return [
				{
					type: 'addMany',
					destination: `${packageFolder}`,
					templateFiles: 'templates/nextjs/**',
					base: 'templates/nextjs',
					abortOnFail: true,
					globOptions: {
						dot: true,
					},
					stripExtensions: ['hbs'],
				},
				async () => {
					// print next steps
					console.log('\n');
					console.log(chalk.redBright("=========What's next==========="));
					console.log('Package created successfully!');
					console.log(`\nNext steps:`);
					console.log('1. Install dependencies: pnpm install');
					console.log('2. Format: pnpm run format:fix');
					console.log('3. Start coding and happy hacking! 🚀');
					console.log(chalk.redBright('====================\n'));

					return chalk.green('Done');
				},
			];
		},
	});
}

//#region Helper functions

//#endregion
