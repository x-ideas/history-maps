import { Pane } from 'tweakpane';

import { applyTimemapYearFilter } from './layer-style.ts';

import type maplibregl from 'maplibre-gl';

export type TimemapPaneParams = {
	year: number;
	/** 矢量瓦片内的 source 名称，用来过滤*/
	timemapSource: string;
};

const defaultTimemapPaneParams = (): TimemapPaneParams => ({
	year: 632,
	timemapSource: 'timemap',
});

export type MountTimemapTweakpaneOptions = {
	title?: string;
	params?: Partial<TimemapPaneParams>;
	yearMin?: number;
	yearMax?: number;
	yearStep?: number;
};

export function mountTimemapTweakpane(
	map: maplibregl.Map,
	opts: MountTimemapTweakpaneOptions = {},
): { pane: Pane; dispose: () => void } {
	const params: TimemapPaneParams = {
		...defaultTimemapPaneParams(),
		...opts.params,
	};

	const pane = new Pane({ title: opts.title ?? '时间地图' });

	const thisYear = new Date().getFullYear();

	pane.addBinding(params, 'year', {
		label: '年份',
		min: opts.yearMin ?? -4000,
		max: opts.yearMax ?? thisYear,
		step: opts.yearStep ?? 1,
	});

	pane.addBinding(params, 'timemapSource', {
		label: '历史地图 source',
	});

	const sync = () => {
		if (!map.isStyleLoaded()) {
			return;
		}
		applyTimemapYearFilter(map, params.year, params.timemapSource);
	};

	pane.on('change', sync);
	map.on('load', sync);

	const dispose = () => {
		map.off('load', sync);
		pane.dispose();
	};

	return { pane, dispose };
}
