<script>
	import SiteShell from '$lib/components/SiteShell.svelte';
	import DottedClouds from '$lib/components/DottedClouds.svelte';
	import PortfolioMapDemo from '$lib/components/PortfolioMapDemo.svelte';

	const MARKETPLACE_LINK = 'https://marketplace.atlassian.com/apps/1226527';
	const DEMO_LINK = 'https://demo.userstorymap.net/projects/DPFJ?selectedItem=tech.realigned.portfoliomap:sidebar-item#/map/1663578993374';
	const HEAD_TITLE = 'Denkplan Portfolio Maps for Jira - Strategy and Jira Work';

	// Stated in machine-readable form so search engines and AI systems attribute
	// the product to the right developer. Mirrors the Organization node on realigned.io.
	const softwareApplicationJson = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Denkplan Portfolio Maps for Jira',
		url: 'https://portfoliomapping.app/',
		description:
			'Connect goals, initiatives, releases, and Jira delivery work in one visual portfolio map.',
		image: 'https://portfoliomapping.app/DenkplanOG2.png',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Atlassian Jira',
		author: {
			'@type': 'Organization',
			name: 'Realigned Technologies',
			url: 'https://realigned.io/'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Realigned Technologies',
			url: 'https://realigned.io/'
		},
		sameAs: ['https://marketplace.atlassian.com/apps/1226527'],
		featureList: [
			'Portfolio maps across multiple Jira projects',
			'Flexible hierarchy with custom issue types and levels',
			'Swimlanes by release, sprint, goal, or custom field',
			'Direct issue editing from the map',
			'PNG export'
		]
	});

	const capabilities = [
		{ title: 'See strategy and delivery together', text: 'Connect high-level goals and initiatives to the Jira work that carries them out.', href: '/docs/goals' },
		{ title: 'Plan on your own model', text: 'Use the issue types, links, columns, and hierarchy that already fit your organization.', href: '/docs/hierarchy' },
		{ title: 'Shape releases visually', text: 'Organize work into releases, sprints, or custom-field swimlanes without leaving the map.', href: '/docs/portfolio-mapping' }
	];
</script>

<SiteShell
	headTitle={HEAD_TITLE}
	description="Connect goals, initiatives, releases, and Jira delivery work in one visual portfolio map."
	marketplaceLink={MARKETPLACE_LINK}
>
	<main class="bg-[var(--bg-base)] text-[var(--text-primary)]">
		<section aria-labelledby="hero-title" class="realigned-hero relative isolate overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-24">
			<DottedClouds opacity={0.18} />
			<div class="wave-glow" aria-hidden="true"></div>
			<div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-4xl text-center">
					<div class="mb-7 flex items-center justify-center gap-5">
						<span class="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-xl bg-white p-2.5 shadow-lg shadow-slate-950/20 sm:h-[4.5rem] sm:w-[4.5rem]">
							<img src="/denkplan.png" width="52" height="52" alt="" class="h-full w-full object-contain" />
						</span>
						<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Denkplan Portfolio Maps for Jira</p>
					</div>
					<h1 id="hero-title" class="text-[clamp(40px,6vw,68px)] font-bold leading-[1.04] tracking-tight text-white">
						Turn your Jira portfolio into a plan everyone can see.
					</h1>
					<p class="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-white/85 sm:text-2xl">
						Connect strategy, initiatives, and delivery work in one visual map—without moving planning outside Jira.
					</p>
					<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
						<a href={MARKETPLACE_LINK} target="_blank" rel="noreferrer" data-umami-event="marketplace_click" data-umami-event-product="portfolio_maps" data-umami-event-listing-id="1226527" data-umami-event-intent="trial" data-umami-event-source-page="/" data-umami-event-placement="homepage_hero" class="realigned-primary-button text-base">Start a free trial</a>
						<a href={DEMO_LINK} target="_blank" rel="noreferrer" data-umami-event="demo_click" data-umami-event-product="portfolio_maps" data-umami-event-source-page="/" data-umami-event-placement="homepage_hero" class="realigned-secondary-button text-base">Explore the live demo</a>
					</div>
				</div>

				<div class="relative mx-auto mt-12 max-w-6xl sm:mt-16">
					<div class="absolute -inset-10 rounded-full bg-cyan-300/10 blur-3xl"></div>
					<div class="relative"><PortfolioMapDemo /></div>
				</div>
			</div>
		</section>

		<section aria-label="Product highlights" class="border-b border-white/10 bg-[var(--bg-base)] py-10">
			<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-4 px-4 text-sm font-semibold text-white/70 sm:px-6 sm:text-base lg:px-8">
				<span class="inline-flex items-center gap-2"><i class="status-check">✓</i> Runs inside Jira</span>
				<span class="inline-flex items-center gap-2"><i class="status-check">✓</i> Multiple projects</span>
				<span class="inline-flex items-center gap-2"><i class="status-check">✓</i> Flexible hierarchy</span>
				<span class="inline-flex items-center gap-2"><i class="status-check">✓</i> PNG export</span>
			</div>
		</section>

		<section aria-labelledby="capabilities-title" class="realigned-dark-gradient border-b border-white/10 py-24">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-3xl text-center">
					<p class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Portfolio planning in context</p>
					<h2 id="capabilities-title" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Keep the big picture connected to live Jira work.</h2>
					<p class="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">Build a portfolio view around the way your organization already plans, then update the work directly from the map.</p>
				</div>
				<div class="mt-14 grid gap-5 md:grid-cols-3">
					{#each capabilities as capability}
						<article class="realigned-card capability-card flex flex-col rounded-lg p-7">
							<div class="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-sky-300/10 text-sky-200">
								<svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4 4L19 6" /></svg>
							</div>
							<h3 class="text-xl font-semibold text-white">{capability.title}</h3>
							<p class="mt-3 flex-1 leading-relaxed text-[var(--text-secondary)]">{capability.text}</p>
							<a href={capability.href} class="mt-6 font-semibold text-sky-200 hover:text-white">Read the guide <span aria-hidden="true">→</span></a>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section aria-labelledby="workflow-title" class="bg-[var(--bg-base)] py-24">
			<div class="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
				<div>
					<p class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Built around your Jira setup</p>
					<h2 id="workflow-title" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Map the portfolio without rebuilding the system behind it.</h2>
					<p class="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">Start from an existing board or create a static map. Configure the hierarchy, add goals above the portfolio, and choose releases, sprints, or custom fields for the swimlanes below it.</p>
					<a href="/docs" class="realigned-secondary-button mt-8">Read the documentation</a>
				</div>
				<img src="/docs/example-portfolio-overview.png" width="1920" height="1080" loading="lazy" alt="Portfolio map overview in Jira" class="w-full drop-shadow-2xl" />
			</div>
		</section>

		<section aria-labelledby="final-cta-title" class="realigned-hero relative overflow-hidden py-20">
			<DottedClouds opacity={0.12} />
			<div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
				<h2 id="final-cta-title" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Put strategy and delivery on the same map.</h2>
				<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">Try Denkplan Portfolio Maps in Jira, or explore the public demo before installing.</p>
				<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
					<a href={MARKETPLACE_LINK} target="_blank" rel="noreferrer" class="realigned-primary-button">Start a free trial</a>
					<a href={DEMO_LINK} target="_blank" rel="noreferrer" class="realigned-secondary-button">Explore the live demo</a>
				</div>
			</div>
		</section>
	</main>
</SiteShell>

<svelte:head>
	{@html `<script type="application/ld+json">${softwareApplicationJson}</script>`}
</svelte:head>

<style>
	.wave-glow { position: absolute; left: -10%; right: -10%; bottom: -24%; height: 45%; background: radial-gradient(ellipse at center, rgba(255,255,255,.25) 0%, rgba(255,255,255,.06) 42%, transparent 72%); filter: blur(16px); pointer-events: none; }
	.status-check { display: inline-grid; width: 1.25rem; height: 1.25rem; place-items: center; border-radius: 999px; background: rgba(125,211,252,.14); color: #bae6fd; font-size: .7rem; font-style: normal; }
	.capability-card { transition: transform 180ms ease, border-color 180ms ease, background 180ms ease; }
	.capability-card:hover { transform: translateY(-4px); border-color: rgba(56,189,248,.38); background: var(--bg-surface-hover); }
</style>
