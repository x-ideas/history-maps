/* eslint-disable no-restricted-syntax */
import chalk from 'chalk';
import {
	descriptionPrompt,
	getInfoFromType,
	namePrompt,
} from '../utils/common-prompt';
import type { PlopTypes } from '@turbo/gen';

type Answers = {
	readonly type: 'app';
	readonly name: string;
	readonly description: string;
	readonly confirm: boolean;
	packageName: string;
};

/**
 * create remix application in apps folder
 */
export function createRemixAppGenerator(plop: PlopTypes.NodePlopAPI) {
	plop.setGenerator('remix', {
		description: 'Generate a remix(react router v7) application',
		prompts: [
			namePrompt(),
			descriptionPrompt(),
			{
				type: 'confirm',
				name: 'confirm',
				message: (answers) => {
					answers.type = 'app';
					return `\n\nContinue?`;
				},
				default: true,
			},
		],
		actions: (data) => {
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
					templateFiles: 'templates/remix/**',
					base: 'templates/remix',
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
