<script>
	import SiteShell from '$lib/components/SiteShell.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { page } from '$app/stores';
	import { canonicalUrlFor, siteOrigin } from '$lib/seo/canonical.js';
	import { aboutPageSchema, breadcrumbSchema, personSchema } from '$lib/seo/schema.js';

	const MARKETPLACE = 'https://marketplace.atlassian.com/apps/1226527';

	const values = [
		{
			title: 'Software you can run',
			text: 'We prefer products teams can understand, operate, and trust, rather than tools that hide how they work.'
		},
		{
			title: 'Focused products',
			text: 'Each product solves a concrete workflow problem instead of trying to be everything at once.'
		},
		{
			title: 'Built in Switzerland',
			text: 'Realigned Technologies is a Swiss software company serving product and delivery teams worldwide.'
		}
	];

	const principles = [
		{
			title: 'Native to Jira',
			text: 'Issues, links, sprints, and releases stay in Jira. The portfolio map is a view over them, not a synced copy in a separate service.'
		},
		{
			title: 'Depth for complex portfolios',
			text: 'Custom-field swimlanes, goal issues, multiple projects, and PNG export give larger organizations the detail they need without a second tool.'
		},
		{
			title: 'Independent and responsive',
			text: 'Realigned is a small, independent vendor. Support comes from the people who build the app, and fixes ship quickly.'
		}
	];

	let canonicalUrl = $derived(canonicalUrlFor($page.url.pathname));
	let structuredData = $derived([
		aboutPageSchema({
			name: 'About Realigned Technologies',
			description:
				'Realigned Technologies is a Swiss software company that builds Denkplan Portfolio Maps for Jira and other focused apps for product and delivery teams.',
			url: canonicalUrl
		}),
		personSchema({
			name: 'Stefan Ernst',
			jobTitle: 'Author, Denkplan Portfolio Maps documentation',
			url: `${siteOrigin}/about`,
			description:
				'Stefan Ernst works on Denkplan Portfolio Maps for Jira at Realigned Technologies and writes the documentation and product updates on this site.'
		}),
		breadcrumbSchema([
			{ name: 'Home', url: siteOrigin },
			{ name: 'About', url: canonicalUrl }
		])
	]);
</script>

<SiteShell
	headTitle="About Realigned Technologies | Denkplan Portfolio Maps"
	description="Realigned Technologies is a Swiss software company that builds Denkplan Portfolio Maps for Jira for product and delivery teams that plan in Jira."
	jsonLd={structuredData}
>
	<main class="bg-[var(--bg-base)] text-[var(--text-primary)]">
		<PageHero
			id="about-title"
			eyebrow="About Realigned"
			title="Portfolio planning that stays in Jira"
			description="Realigned builds focused Jira apps for product and delivery teams. Denkplan Portfolio Maps for Jira is one of them."
		/>

		<section aria-labelledby="company-title" class="realigned-band border-y border-[var(--border-subtle)] py-16 sm:py-20">
			<div class="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:px-8">
				<div>
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">The company</p>
					<h2 id="company-title" class="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">A Swiss software company</h2>
					<p class="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
						Realigned Technologies is a Swiss software company serving teams worldwide. We build tools for teams that want clarity in planning, ownership of their systems, and fewer surprises in the software they depend on.
					</p>
					<p class="mt-4 leading-7 text-[var(--text-secondary)]">
						Our products are used by product managers, portfolio leads, and Jira administrators in teams of every size. The work on this site, from the documentation to the release notes, is written by the people who build and support the app.
					</p>
				</div>

				<div class="realigned-card rounded-xl p-7">
					<h3 class="text-lg font-semibold text-[var(--text-primary)]">Company details</h3>
					<address class="mt-4 not-italic leading-7 text-[var(--text-secondary)]">
						<strong class="font-semibold text-[var(--text-primary)]">Realigned Technologies Ltd</strong><br />
						Suurstoffi 16<br />
						CH-6343 Rotkreuz<br />
						Switzerland
					</address>
					<p class="mt-4 leading-7 text-[var(--text-secondary)]">
						Email <a class="font-semibold text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="mailto:info@realigned.io">info@realigned.io</a>
					</p>
					<a href="/contact" class="realigned-secondary-button mt-6 w-fit">Contact Realigned</a>
				</div>
			</div>
		</section>

		<section aria-labelledby="values-title" class="bg-[var(--bg-base)] py-16 sm:py-20">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="max-w-2xl">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">How we build</p>
					<h2 id="values-title" class="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Principles we work from</h2>
				</div>
				<div class="mt-12 grid gap-5 md:grid-cols-3">
					{#each values as value}
						<article class="realigned-card rounded-xl p-7">
							<h3 class="text-xl font-semibold text-[var(--text-primary)]">{value.title}</h3>
							<p class="mt-3 leading-7 text-[var(--text-secondary)]">{value.text}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section aria-labelledby="apps-title" class="realigned-band border-y border-[var(--border-subtle)] py-16 sm:py-20">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="max-w-2xl">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Our Jira apps</p>
					<h2 id="apps-title" class="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Portfolio mapping that stays in Jira</h2>
					<p class="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
						Denkplan Portfolio Maps for Jira puts goals, initiatives, and delivery work on one visual map, so teams can see the shape of the portfolio and decide what belongs in the next release — without moving planning outside Jira.
					</p>
				</div>

				<div class="mt-12 grid gap-5 md:grid-cols-3">
					{#each principles as principle}
						<article class="realigned-card rounded-xl p-7">
							<h3 class="text-xl font-semibold text-[var(--text-primary)]">{principle.title}</h3>
							<p class="mt-3 leading-7 text-[var(--text-secondary)]">{principle.text}</p>
						</article>
					{/each}
				</div>

				<div class="mt-10 flex flex-col gap-4 sm:flex-row">
					<a href={MARKETPLACE} target="_blank" rel="noreferrer" class="realigned-primary-button">See Denkplan Portfolio Maps</a>
					<a href="/docs" class="realigned-secondary-button">Read the documentation</a>
				</div>
			</div>
		</section>

		<section aria-labelledby="author-title" class="bg-[var(--bg-base)] py-16 sm:py-20">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="realigned-card grid gap-8 rounded-xl p-8 md:grid-cols-[auto_1fr] md:items-start md:p-10">
					<div class="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--action-soft)] text-2xl font-bold text-[var(--accent-cyan)]" aria-hidden="true">SE</div>
					<div>
						<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Author</p>
						<h2 id="author-title" class="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Stefan Ernst</h2>
						<p class="mt-1 text-sm font-semibold text-[var(--accent-cyan)]">Author, Denkplan Portfolio Maps documentation</p>
						<p class="mt-4 leading-7 text-[var(--text-secondary)]">
							Stefan Ernst works on Denkplan Portfolio Maps for Jira at Realigned Technologies. The documentation, tutorials, and release notes on this site are written and maintained by the team that builds the app, so answers come from close to the product.
						</p>
						<p class="mt-4 leading-7 text-[var(--text-secondary)]">
							Found a mistake or an unclear answer? <a class="font-semibold text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="/contact">Contact us</a> and it will be reviewed.
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>
</SiteShell>
