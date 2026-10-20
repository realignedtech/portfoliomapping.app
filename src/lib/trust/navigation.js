export const trustNavigation = [
	{
		href: '/trust',
		title: 'Trust Center',
		navTitle: 'Overview',
		description: 'Security, privacy, and compliance information in one place.'
	},
	{
		href: '/trust/security-policy',
		title: 'Security & Technology Policies',
		description: 'How we manage access, risk, infrastructure, and operations.'
	},
	{
		href: '/trust/security-scanning',
		title: 'Security Scanning Practices',
		description: 'Our dependency, application, and Atlassian ecosystem scanning practices.'
	},
	{
		href: '/trust/bug-fix-policy',
		title: 'Bug Fix Policy',
		description: 'Severity-based objectives for resolving security vulnerabilities.'
	},
	{
		href: '/trust/bug-bounty-program',
		title: 'Bug Bounty Program',
		description: 'Program scope, focus areas, rewards, and remediation expectations.'
	},
	{
		href: '/trust/security-and-privacy-faq',
		title: 'Security & Privacy FAQ',
		description: 'Answers about hosting, data, analytics, and application security.'
	},
	{
		href: '/trust/privacy-policy',
		title: 'Data Processing Statement',
		description: 'How Realigned collects, processes, protects, and retains data.'
	},
	{
		href: '/trust/self-assessment-questionaire',
		title: 'Self-Assessment Responses',
		description: 'Our public cloud security and compliance questionnaire responses.'
	}
];

export function trustPageFor(pathname) {
	return trustNavigation.find((item) => item.href === pathname) || trustNavigation[0];
}
