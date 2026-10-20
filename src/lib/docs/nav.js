export const titles = {
	intro: 'Introduction',
	overview: 'Overview',
	'portfolio-mapping': 'Using the App',
	'pro-setup': 'Getting Started',
	'map-types': 'Map Types',
	'multiple-projects': 'Multiple Projects',
	hierarchy: 'Hierarchy & Top-level Elements',
	goals: 'Goals',
	'custom-field-swimlanes': 'Custom Field Swimlanes',
	settings: 'Settings',
	board: 'Board Settings',
	'admin-guide': 'Admin Guide',
	troubleshooting: 'Troubleshooting',
	support: 'Support',
	privacy: 'Privacy Information',
	eula: 'End User License Agreement'
};

export const PortfolioMapTitles = titles;

export const PortfolioNav = [
	{ link: '/', title: titles.intro },
	{ link: '/pro-setup', title: titles['pro-setup'] },
	{
		link: '/portfolio-mapping', title: titles['portfolio-mapping'], children: [
			{ link: '/overview', title: titles.overview },
			{ link: '/map-types', title: titles['map-types'] },
			{ link: '/multiple-projects', title: titles['multiple-projects'] },
			{ link: '/hierarchy', title: titles.hierarchy },
			{ link: '/goals', title: titles.goals },
			{ link: '/custom-field-swimlanes', title: titles['custom-field-swimlanes'] }
		]
	},
	{
		link: '/settings', title: titles.settings, children: [
			{ link: '/settings/board', title: titles.board },
			{ link: '/admin-guide', title: titles['admin-guide'] }
		]
	},
	{ link: '/troubleshooting', title: titles.troubleshooting },
	{
		link: '/support', title: titles.support, children: [
			{ link: '/support/privacy', title: titles.privacy },
			{ link: '/support/eula', title: titles.eula }
		]
	}
];

export default PortfolioNav;
