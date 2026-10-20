// Verifies the static export against the site's SEO and integrity rules.
// Run after `npm run build`. Fails loudly so a broken export cannot ship.
//
// Checks:
//  1. every page: single title, self-canonical, meta description, exactly one h1
//  2. sitemap URL set equals the exported page set (minus the noindex 404 page)
//  3. robots.txt is real, points at the sitemap, and does not block the site
//  4. every internal link resolves to an exported page
//  5. every referenced local asset exists in the export
//  6. the homepage carries a parseable SoftwareApplication JSON-LD node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BUILD = 'build';
const ORIGIN = 'https://portfoliomapping.app';

const failures = [];
const problem = (message) => failures.push(message);

function pageFiles(dir, base = '') {
	const files = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			files.push(...pageFiles(join(dir, entry.name), `${base}/${entry.name}`));
		} else if (entry.isFile() && entry.name.endsWith('.html')) {
			files.push({ route: `${base}/${entry.name.slice(0, -5)}` === '/index' ? '/' : `${base}/${entry.name.slice(0, -5)}`, path: join(dir, entry.name) });
		}
	}
	return files;
}

const pages = pageFiles(BUILD);
const exportedRoutes = new Set(pages.map((p) => p.route));

for (const { route, path } of pages) {
	const html = readFileSync(path, 'utf8');
	const label = route === '/' ? 'homepage' : route;

	const titles = [...html.matchAll(/<title>(.*?)<\/title>/gs)];
	if (titles.length !== 1) problem(`${label}: ${titles.length} <title> elements`);
	else if (/ - Home<\/title>/.test(titles[0][1])) problem(`${label}: title ends in "- Home"`);

	// The noindex 404 page needs none of the indexing metadata below.
	if (route === '/404') continue;

	const canonicals = [...html.matchAll(/rel="canonical" href="([^"]*)"/g)];
	if (canonicals.length !== 1) problem(`${label}: ${canonicals.length} canonical links`);
	else if (canonicals[0][1] !== `${ORIGIN}${route}`) problem(`${label}: canonical ${canonicals[0][1]} does not match route`);

	if (!/<meta name="description" content="[^"]{20,}"\/?>/.test(html)) problem(`${label}: missing or short meta description`);

	const h1s = [...html.matchAll(/<h1[\s>]/g)];
	if (h1s.length !== 1) problem(`${label}: ${h1s.length} <h1> elements`);

	if (/href="\/[^"]*"/.test(html) === false && route !== '/') { /* informational only */ }

	for (const match of html.matchAll(/href="(\/[^"#]*?)"/g)) {
		const target = match[1].split('?')[0].replace(/\/+$/, '') || '/';
		if (!exportedRoutes.has(target)) problem(`${label}: internal link to unexported route ${target}`);
	}

	for (const match of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:png|webp|svg|jpg|jpeg|json|xml|txt|mp4|ico))"/g)) {
		const asset = match[1].split('?')[0];
		if (!existsSync(join(BUILD, asset))) problem(`${label}: missing asset ${asset}`);
	}
}

// Sitemap
const sitemapPath = join(BUILD, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
	problem('sitemap.xml missing from export');
} else {
	const sitemapUrls = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>https:\/\/portfoliomapping\.app([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
	const expected = [...exportedRoutes].filter((r) => r !== '/404').sort();
	const missing = expected.filter((r) => !sitemapUrls.includes(r));
	const extra = sitemapUrls.filter((r) => !expected.includes(r));
	if (missing.length) problem(`sitemap.xml missing: ${missing.join(', ')}`);
	if (extra.length) problem(`sitemap.xml lists unknown routes: ${extra.join(', ')}`);
}

// robots.txt
const robotsPath = join(BUILD, 'robots.txt');
if (!existsSync(robotsPath)) {
	problem('robots.txt missing from export');
} else {
	const robots = readFileSync(robotsPath, 'utf8');
	if (!/Sitemap: https:\/\/portfoliomapping\.app\/sitemap\.xml/.test(robots)) problem('robots.txt does not declare the sitemap');
	if (/Disallow: \/$/.test(robots)) problem('robots.txt disallows the whole site');
}

// 404 page
const notFoundPath = join(BUILD, '404.html');
if (!existsSync(notFoundPath)) problem('404.html missing from export');
else if (!/noindex/.test(readFileSync(notFoundPath, 'utf8'))) problem('404.html is missing its noindex directive');

// SoftwareApplication JSON-LD on the homepage
const homeHtml = readFileSync(join(BUILD, 'index.html'), 'utf8');
const jsonLdMatches = [...homeHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
if (jsonLdMatches.length === 0) {
	problem('homepage has no JSON-LD structured data');
} else {
	for (const match of jsonLdMatches) {
		try {
			const node = JSON.parse(match[1]);
			if (node['@type'] !== 'SoftwareApplication') problem(`homepage JSON-LD has unexpected @type ${node['@type']}`);
			if (node.name !== 'Denkplan Portfolio Maps for Jira') problem(`homepage JSON-LD has unexpected name "${node.name}"`);
			if (node.author?.name !== 'Realigned Technologies') problem('homepage JSON-LD does not name Realigned Technologies as author');
			if (!node.sameAs?.includes('https://marketplace.atlassian.com/apps/1226527')) problem('homepage JSON-LD does not reference the Marketplace listing');
		} catch (error) {
			problem(`homepage JSON-LD is not parseable: ${error.message}`);
		}
	}
}

if (failures.length) {
	console.error(`verify-export: ${failures.length} problem(s)\n`);
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}
console.log(`verify-export: OK (${pages.length} pages, sitemap, robots, 404, JSON-LD, links, assets)`);
