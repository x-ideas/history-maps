## 地图数据
包含了用于在leaflet，mapbox，maplibre-gl, mapbox-gl-js等地图库中使用的历史地图数据。

### 目录结构
```
|--source  # 原始的pbf数据，按照瓦片的层级结构存放
|--build # 处理后的数据
|  |--pmtiles # 存放pmtiles格式的数据,用于静态部署
|  |--
|--src # 本地示例代码
```

## 使用
以maplibre-gl为例，加载build中的pmtiles数据，代码如下：

### 第一步: 安装maplibre-gl和pmtiles
```
pnpm add maplibre-gl pmtiles
```

### 第二步: 给地图添加pmtiles协议
```js
import maplibregl from "maplibre-gl";
import {Protocol} from "pmtiles";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
```

### 第三步: 初始化地图
```js
import {Map} from 'maplibre-gl';
const map = new Map({
  container: 'app',
  style: 'http://localhost:5173/build/pmtiles/styles.json',
  center: [120.19, 30.26],
  zoom: 4,
	minZoom: 1,
	maxZoom: 18,
});
```


### 第四步:过滤展示历史数据
```js
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
```

效果如下:
![timemap-example](../../docs/history-maps-example.jpg)
完整示例效果请执行`pnpm run dev`查看。


## 部署

可以直接把build目录下的pmtiles和styles.json上传到云存储，然后配置中指向对应的url即可。
* pmtiles数据可以作为静态资源上传到任何云存储(推荐`cloudflare R2`)，拿到url后就可以通过http访问，不需要额外的服务支持。
* styles.json同样可以作为静态资源上传到云存储，配置中指向的source url改为对应的pmtiles url即可。

> 如果只想尝试一下，可以使用已经部署在`cloudflare R2`上的[style数据](https://history-maps.xjiaxiang.top/2026-04-06/styles.json)。