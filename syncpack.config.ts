import type { RcFile } from 'syncpack';

export default {
	sortAz: [
		'bin',
		'contributors',
		'dependencies',
		'devDependencies',
		'keywords',
		'peerDependencies',
		'resolutions',
	],
	// semver validation rules configuration
	semverGroups: [
		{
			label: 'dependencies(prod, dev, peer) should use exact versions',
			dependencyTypes: ['prod', 'dev', 'peer'],
			range: '',
		},
	],
	// package version validation rules configuration
	versionGroups: [
		{
			label: 'Use workspace protocol when developing local packages',
			dependencies: ['$LOCAL'],
			dependencyTypes: ['dev', 'prod', 'peer'],
			pinVersion: 'workspace:^',
		},
	],
	// treat multiple packages as one package
	dependencyGroups: [
		{
			dependencies: ['react', '@types/react', 'react-dom', '@types/react-dom'],
			aliasName: 'react',
		},
	],
} satisfies RcFile;
