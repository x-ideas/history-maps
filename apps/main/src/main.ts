import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';

import 'maplibre-gl/dist/maplibre-gl.css';
import { mountTimemapTweakpane } from './timemap/index.ts';

function registerPmtilesProtocol(): void {
	const protocol = new Protocol();
	maplibregl.addProtocol('pmtiles', protocol.tile);
}

function initMap() {
	const map = new maplibregl.Map({
		style: '/build/pmtiles/styles.json',
		container: document.getElementById('app')!,
		minZoom: 1,
	});
	return map;
}

function run() {
	registerPmtilesProtocol();
	const map = initMap();
	mountTimemapTweakpane(map);
}

run();
