import { siteOrigin } from './canonical.js';

// Organization and WebSite are emitted on every page by Header.svelte.
export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${siteOrigin}/#organization`,
	name: 'Realigned Technologies Ltd',
	alternateName: 'Realigned',
	url: 'https://realigned.io',
	logo: `${siteOrigin}/Realigned-ink.svg`,
	email: 'info@realigned.io',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Suurstoffi 16',
		addressLocality: 'Rotkreuz',
		postalCode: '6343',
		addressCountry: 'CH'
	},
	sameAs: [
		'https://twitter.com/RealignedT',
		'https://www.linkedin.com/company/realigned-technologies-ltd/'
	],
	contactPoint: [
		{
			'@type': 'ContactPoint',
			contactType: 'customer support',
			email: 'support@realigned.io',
			url: 'https://realignedtechnologies.atlassian.net/servicedesk/customer/portal/1',
			availableLanguage: ['en']
		}
	]
};

export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${siteOrigin}/#website`,
	name: 'Denkplan Portfolio Maps for Jira',
	url: siteOrigin,
	inLanguage: 'en',
	publisher: { '@id': `${siteOrigin}/#organization` }
};

export function softwareApplicationSchema({
	name,
	description,
	url,
	image,
	applicationCategory = 'BusinessApplication',
	operatingSystem = 'Atlassian Jira',
	featureList,
	sameAs
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name,
		description,
		url,
		...(image ? { image } : {}),
		applicationCategory,
		operatingSystem,
		...(featureList ? { featureList } : {}),
		...(sameAs ? { sameAs } : {}),
		publisher: { '@id': `${siteOrigin}/#organization` }
	};
}

export function techArticleSchema({ headline, description, url, keywords, product, datePublished = '2026-10-20T00:00:00.000Z' }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		name: product ? `${headline} (${product})` : headline,
		headline,
		description,
		url,
		datePublished,
		dateModified: datePublished,
		image: [`${siteOrigin}/DenkplanOG2.png`],
		inLanguage: 'en',
		...(keywords ? { keywords } : {}),
		isPartOf: { '@id': `${siteOrigin}/#website` },
		author: { '@id': `${siteOrigin}/#organization` },
		publisher: { '@id': `${siteOrigin}/#organization` }
	};
}

export function articleSchema({ headline, description, url, datePublished, dateModified, image, author }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline,
		description,
		url,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		datePublished,
		dateModified: dateModified || datePublished,
		...(image ? { image: [image] } : {}),
		inLanguage: 'en',
		author: author ? { '@type': 'Person', name: author } : { '@id': `${siteOrigin}/#organization` },
		publisher: { '@id': `${siteOrigin}/#organization` }
	};
}

export function breadcrumbSchema(items) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export function faqSchema(items) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map(({ question, answer }) => ({
			'@type': 'Question',
			name: question,
			acceptedAnswer: { '@type': 'Answer', text: answer }
		}))
	};
}
