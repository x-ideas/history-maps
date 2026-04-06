import { createBasicPkgGenerator } from './gen-basic-pkg/generator';
import { createNextjsAppGenerator } from './gen-nextjs-app/generators';
import { createRemixAppGenerator } from './gen-remix-app/generators';
import { registerAndOrLogicHelper } from './helper/and-or-logic';
import { registerCompareHelper } from './helper/compare';
import type { PlopTypes } from '@turbo/gen';

export default function generate(plop: PlopTypes.NodePlopAPI) {
	// registry helper
	registerAndOrLogicHelper(plop);
	registerCompareHelper(plop);

	// regist generator
	createBasicPkgGenerator(plop);
	createNextjsAppGenerator(plop);
	createRemixAppGenerator(plop);
}
