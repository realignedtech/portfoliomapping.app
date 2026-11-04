export const trustNavigation = [
	{
		href: '/trust',
		title: 'Trust Center',
		navTitle: 'Overview',
		description: 'Security, privacy, and compliance information for Denkplan Portfolio Maps for Jira: policies, scanning practices, and how we handle your data.'
	},
	{
		href: '/trust/security-policy',
		title: 'Security & Technology Policies',
		description: 'How Realigned manages access, risk, infrastructure, and operations for Denkplan Portfolio Maps for Jira, and the controls behind them.'
	},
	{
		href: '/trust/security-scanning',
		title: 'Security Scanning Practices',
		description: 'Our dependency, application, and Atlassian ecosystem scanning practices, and how findings are triaged, tracked, and remediated.'
	},
	{
		href: '/trust/bug-fix-policy',
		title: 'Bug Fix Policy',
		description: 'Severity-based objectives for resolving security vulnerabilities, with target timeframes for each severity level and how fixes are reported.'
	},
	{
		href: '/trust/bug-bounty-program',
		title: 'Bug Bounty Program',
		description: 'Bug bounty program scope, focus areas, reward framework, and remediation expectations for security researchers reporting to Realigned.'
	},
	{
		href: '/trust/security-and-privacy-faq',
		title: 'Security & Privacy FAQ',
		description: 'Answers about hosting, data storage, analytics, and application security for Denkplan Portfolio Maps for Jira and Realigned.'
	},
	{
		href: '/trust/privacy-policy',
		title: 'Data Processing Statement',
		description: 'How Realigned collects, processes, protects, and retains data for Denkplan Portfolio Maps for Jira, and the rights you hold.'
	},
	{
		href: '/trust/self-assessment-questionaire',
		title: 'Self-Assessment Responses',
		description: 'Our public responses to the cloud security, governance, and compliance questionnaire for Denkplan Portfolio Maps for Jira.'
	}
];

export function trustPageFor(pathname) {
	return trustNavigation.find((item) => item.href === pathname) || trustNavigation[0];
}
