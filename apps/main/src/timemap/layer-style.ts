import type maplibregl from 'maplibre-gl';
import type { FilterSpecification } from 'maplibre-gl';

/**
 * 获取使用sourceName的所有图层id
 */
export function getTimemapLayerIds(
	map: maplibregl.Map,
	sourceName: string,
): string[] {
	const layers = map.getStyle().layers;
	if (!layers) return [];
	return layers
		.filter((l) => 'source' in l && l.source === sourceName)
		.map((l) => l.id);
}

/**
 * 对使用了sourceName的图层，设置年份过滤条件
 */
export function applyTimemapYearFilter(
	map: maplibregl.Map,
	year: number,
	sourceName: string,
): void {
	const filter: FilterSpecification = [
		'all',
		['<', 'start_date', year],
		['>', 'end_date', year],
	];
	for (const id of getTimemapLayerIds(map, sourceName)) {
		map.setFilter(id, filter);
	}
}
