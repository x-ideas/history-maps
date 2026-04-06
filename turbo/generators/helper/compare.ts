/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PlopTypes } from '@turbo/gen';

/**
 * A Handlebars helper to compare two values with a specified operator.
 * @example
 * {{#if (compare var1 '===' var2)}}
 *   <!-- Do something if var1 is strictly equal to var2 -->
 * {{else}}
 *   <!-- Do something else -->
 * {{/if}}
 */
export function registerCompareHelper(plop: PlopTypes.NodePlopAPI) {
	plop.setHelper('compare', (a: unknown, operator: string, b: unknown) => {
		const operators = {
			'==': function (l: unknown, r: unknown) {
				return l == r;
			},
			'===': function (l: unknown, r: unknown) {
				return l === r;
			},
			'!=': function (l: unknown, r: unknown) {
				return l != r;
			},
			'!==': function (l: unknown, r: unknown) {
				return l !== r;
			},
			'<': function (l: any, r: any) {
				return l < r;
			},
			'>': function (l: any, r: any) {
				return l > r;
			},
			'<=': function (l: any, r: any) {
				return l <= r;
			},
			'>=': function (l: any, r: any) {
				return l >= r;
			},
			typeof: function (l: unknown, r: unknown) {
				return typeof l == r;
			},
		};

		if (!operators[operator])
			throw new Error(
				"Handlerbars Helper 'compare' doesn't know the operator " + operator,
			);

		const result = operators[operator](a, b);

		if (!!result) {
			return true;
		} else {
			return false;
		}
	});
}
