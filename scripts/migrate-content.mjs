import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative } from 'node:path';

const sourceRoot = process.argv[2];
const destinationRoot = process.argv[3];

const titles = {
	'admin-guide': 'Administrators Guide',
	'custom-field-swimlanes': 'Custom Field Swimlanes',
	goals: 'Swimlane Goals',
	hierarchy: 'Hierarchy & Top-level Elements',
	index: 'Introduction',
	'map-types': 'Map Types',
	'multiple-projects': 'Multiple Projects',
	overview: 'Overview',
	'portfolio-mapping': 'Using the App',
	'pro-setup': 'Getting Started',
	settings: 'Settings',
	board: 'Board Configuration',
	eula: 'End User License Agreement',
	privacy: 'Privacy Information',
	troubleshooting: 'Troubleshooting',
	support: 'Support'
	,'portfolio-management-with-jira': 'How to do Portfolio Management with Jira Software'
};

async function filesUnder(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await filesUnder(path));
		else if (entry.name.endsWith('.mdx')) files.push(path);
	}
	return files;
}

function cleanSource(source, name) {
	const metaStart = source.indexOf('export const meta = {');
	const metaEnd = metaStart >= 0 ? source.indexOf('\n}', metaStart) : -1;
	const meta = metaStart >= 0 && metaEnd >= 0 ? source.slice(metaStart, metaEnd + 2) : '';
	const description = meta.match(/description:\s*[`\"']([\s\S]*?)[`\"']\s*(?:,|\n)/)?.[1]?.trim() || `${titles[name] || name} documentation for Denkplan Portfolio Maps for Jira.`;
	const date = meta.match(/date:\s*(\d+)/)?.[1];
	let body = metaEnd >= 0 ? source.slice(metaEnd + 2) : source;
	body = body.replace(/^import\s+[\s\S]*?from\s+[\"'][^\"']+[\"'];?\s*/gm, '');
	body = body.replace(/^export default[^\n]*\n?/gm, '');
	body = body.replace(/Advanced Story Maps for Jira/g, 'Denkplan Portfolio Maps for Jira');
	body = body.replace(/story mapping app/g, 'portfolio mapping app');
	return `---\ntitle: ${JSON.stringify(titles[name] || name)}\ndescription: ${JSON.stringify(description)}${date ? `\ndate: ${date}` : ''}\n---\n\n${body.trim()}\n`;
}

for (const file of await filesUnder(sourceRoot)) {
	const sourceRelative = relative(sourceRoot, file);
	const segments = sourceRelative.split('/');
	const filename = basename(file, '.mdx');
	const routeSegments = filename === 'index' ? segments.slice(0, -1) : [...segments.slice(0, -1), filename];
	const destination = join(destinationRoot, ...routeSegments, '+page.md');
	await mkdir(dirname(destination), { recursive: true });
	await writeFile(destination, cleanSource(await readFile(file, 'utf8'), filename));
}
