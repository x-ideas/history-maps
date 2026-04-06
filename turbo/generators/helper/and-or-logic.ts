import type { PlopTypes } from '@turbo/gen';

/**
 * Handlebars helper to perform logical AND and OR operations.
 * @example
 * {{#if (and condition1 condition2)}}
 *  <!-- Do something if both condition1 and condition2 are true -->
 * {{/if}}
 *
 * {{#if (or condition1 condition2)}}
 * <!-- Do something if either condition1 or condition2 is true -->
 * {{/if}}
 */
export function registerAndOrLogicHelper(plop: PlopTypes.NodePlopAPI) {
	plop.setHelper('and', function (...args) {
		return Array.prototype.slice.call(args, 0, -1).every(Boolean);
	});

	plop.setHelper('or', function (...args) {
		return Array.prototype.slice.call(args, 0, -1).some(Boolean);
	});
}
