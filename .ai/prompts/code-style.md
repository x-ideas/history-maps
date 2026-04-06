


## Development Guidelines

* avoid `circle dependency` between modules( files or subpackages)
* **CRITICAL**: upper package can depend lower package, but lower package cannot depend upper package.
* keep the entry package as simple as possible, don't do too much logic work in it, the logic work should be done in the packages that in `features/` or `packages/` directory.

## Code Style

### Imports
**CRITICAL**

- Inside package: prefer **relative** imports or **`imports`** in `package.json`:

```json
"imports": { "#*": "./src/*" }
```

```ts
// relative import
import { x } from './utils';
// imports field import
import { x } from '#/utils';
```

- Outside package: prefer **package name** imports:

```ts
import { x } from 'my-package/utils';
```

### File naming
- Prefer **kebab-case** for file names, e.g. `my-package.ts`.