# Project Basic Structure

## Terminology

| Term | Level| Meaning | Note |
|------|--------|--------|------|
| root package | -- |Root directory package with config and scripts | abbreviated: root |
| dep package | 1 | Entry in `dependencies` / `devDependencies` / `peerDependencies` | abbreviated: dep |
| mono package | 3 | Package under `packages/`, `apps/`, etc. (see pnpm-workspace.yaml); independent module | also: subpackage |
| entry package | 5 | special mono package which is the entry point of a product for user, for example, a web application, a document site, etc. | |

**Note**: the level is not related to the physical structure of the project, but the logical structure.
if a package has a lower level, we call it a `lower package`, otherwise we call it a `upper package`.


## Stack
- pnpm+workspace, TypeScript, Turbo, Vitest
- ESLint + Oxc, Prettier + Oxc, commitlint + husky, lint-staged, syncpack


## Design Principles

The whole project is followed by the same simple design principles:
- **Independence**
  - Each package declares its dep packages explicitly.
  - Dep versions are **exact** (e.g. `1.0.0`), avoid ranges like `^1.0.0`.
  - Each package follows SRP(Single Responsibility Principle); no mixing of unrelated functionality.
- **High cohesion**
  - Package contains all related functionality (utils, UI, types, etc.) and exposes it via its public API. For example, a package `@x-pkg/account` should contain all related functionality to account, including utils（isAdminUser）, UI（Login, Logout）, types, api（login， logout）etc. and exposes it via its public API defined in `exports` field.
- **Maintainability**
  - Clear docs are needed, tests are needed if needed.

so we can reach the basic  structure and rules of a package:

## Basic Structure of a Package
```
|-- package A
|  |-- src
|  |-- __tests__
|  |--readme.md
|  |--package.json
```

* `package.json`: define the entry point of the package
	* `exports`: define the ability that other package can use.
	* `imports`: define the path alias for inner imports.
* `src`: the source code
* `__tests__`: the test code
* `readme.md`: the documentation of the package


**Note**:  `exports` and `imports` are **important**, they define the ability that other package can use and the path alias for inner imports.
the basic `imports` and `exports` field in `package.json` should be like this:
```json
{
	"exports": { // define the ability that other package can use
		".": "./src/index.ts"
		// other exports if needed
	},
	"imports": { // define the path alias for inner imports
		"#entry": "./src/index.ts", // for import package from test files
		"#*": "./src/*" // for import expression    files in src directory
	}
}
```

and each package has some common scripts defined in `package.json`, such as:
```json
{
	"scripts": {
		"clean": "...",
		"format": "...",
		"format:fix": "...",
		"lint": "...",
		"lint:fix": "...",
		"test": "...",
		"dev": "...",  // only entry package and root package have
		"build": "...", // only entry package and root package have
		"preview": "...", // only entry package and root package have
	}
}
```


## The Whole Project Structure

```
apps/       # applications (web, mobile, etc.)
dev-tools/  # eslint, prettier, etc.
features/   # business modules (user, product, etc.), the most logic work should be done in this directory.
packages/   # shared (UI, utils, types), the most common code should be stored in this directory.
turbo/
  generators/  # turbo code generators
```

**CRITICAL**: keep the entry package as simple as possible, the main work of the entry package is to combine the features and packages to form a complete product. Don't do too much logic work in it, the logic work should be done in the packages that in packages that located in `features/` or `packages/` directory.