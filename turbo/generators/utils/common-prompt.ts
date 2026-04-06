import path from 'node:path';
import type { PlopTypes } from '@turbo/gen';

type Answers = {
	readonly type: 'package' | 'app' | 'feature';
	readonly name: string;
	readonly description: string;
};

export function namePrompt(): PlopTypes.PromptQuestion {
	return {
		type: 'input',
		name: 'name',
		message:
			'Package name, does not need include the scope (in kebab-case, e.g., my-package, rather than @scope/my-package):',
		validate: (value) => {
			if (!value) {
				return 'Package name is required';
			}
			return true;
		},
	};
}

export function typePrompt(): PlopTypes.PromptQuestion {
	return {
		type: 'list',
		name: 'type',
		message: 'Select the type of package:',
		choices: [
			{
				name: 'Application(like web application, mobile application)',
				value: 'app',
			},
			{
				name: "Feature Module(app's feature module, like auth, analysics, team etc)",
				value: 'feature',
			},
			{ name: 'Standard Package(common ui or tools)', value: 'package' },
		],
		default: 'package',
	};
}

export function descriptionPrompt(): PlopTypes.PromptQuestion {
	return {
		type: 'input',
		name: 'description',
		message: 'Package description:',
	};
}

/**
 * Returns package information based on the provided type and name.
 *
 * Determines the scope and package folder according to the `type` property of the `answer` object.
 * Supported types are: 'app', 'e2e', 'feature', and 'package' (default).
 * The returned object includes the normalized package name, scope, and folder path.
 *
 * @param answer - An object containing the type and name of the package.
 * @returns An object with the following properties:
 * - `name`: The base name of the package.
 * - `packageName`: The scoped package name (e.g., `@x-apps/my-app`).
 * - `scope`: The scope string (e.g., `@x-apps`).
 * - `packageFolder`: The folder path for the package (e.g., `apps/my-app`).
 */
export function getInfoFromType(answer: Answers) {
	let scope = '';
	let packageFolder = '';
	switch (answer.type) {
		case 'app':
			scope = '@x-apps';
			packageFolder = 'apps';
			break;
		case 'feature':
			scope = '@x-features';
			packageFolder = 'features';
			break;
		case 'package':
		default:
			scope = '@x-pkg';
			packageFolder = 'packages';
			break;
	}

	const name = path.basename(answer.name);
	return {
		name,
		packageName: `${scope}/${name}`,
		scope,
		packageFolder: `${packageFolder}/${answer.name}`,
	};
}
