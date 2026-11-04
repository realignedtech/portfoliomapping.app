<script>
	import SiteShell from '$lib/components/SiteShell.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { page } from '$app/stores';
	import { canonicalUrlFor, siteOrigin } from '$lib/seo/canonical.js';
	import { breadcrumbSchema, contactPageSchema } from '$lib/seo/schema.js';

	const SUPPORT_PORTAL = 'https://realignedtechnologies.atlassian.net/servicedesk/customer/portal/1';
	const LINKEDIN = 'https://www.linkedin.com/company/realigned-technologies-ltd/';
	const MARKETPLACE = 'https://marketplace.atlassian.com/apps/1226527';

	const channels = [
		{
			title: 'Support portal',
			description: 'For support, product questions, licensing, and vendor information for Denkplan Portfolio Maps for Jira.',
			href: SUPPORT_PORTAL,
			label: 'Open support portal',
			external: true,
			primary: true
		},
		{
			title: 'Email',
			description: 'For direct contact and general enquiries to Realigned Technologies.',
			href: 'mailto:info@realigned.io',
			label: 'info@realigned.io',
			external: false
		},
		{
			title: 'LinkedIn',
			description: 'Follow Realigned Technologies or reach out to us on LinkedIn.',
			href: LINKEDIN,
			label: 'Visit LinkedIn',
			external: true
		}
	];

	let canonicalUrl = $derived(canonicalUrlFor($page.url.pathname));
	let structuredData = $derived([
		contactPageSchema({
			name: 'Contact Realigned Technologies',
			description:
				'Contact options for Denkplan Portfolio Maps for Jira support, licensing, vendor information, and general enquiries to Realigned Technologies.',
			url: canonicalUrl
		}),
		breadcrumbSchema([
			{ name: 'Home', url: siteOrigin },
			{ name: 'Contact', url: canonicalUrl }
		])
	]);
</script>

<SiteShell
	headTitle="Contact Realigned Technologies | Denkplan Portfolio Maps"
	description="Contact Realigned Technologies for Denkplan Portfolio Maps for Jira support, licensing, and general enquiries by email, support portal, or LinkedIn."
	jsonLd={structuredData}
>
	<main class="bg-[var(--bg-base)] text-[var(--text-primary)]">
		<PageHero
			id="contact-title"
			eyebrow="Contact"
			title="Contact Realigned"
			description="Direct contact options for product support, licensing, vendor information, and general enquiries about Denkplan Portfolio Maps for Jira."
		/>

		<section aria-labelledby="channels-title" class="realigned-band border-y border-[var(--border-subtle)] py-16 sm:py-20">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<h2 id="channels-title" class="sr-only">Contact options</h2>
				<div class="grid gap-5 md:grid-cols-3">
					{#each channels as channel}
						<article class="realigned-card flex h-full flex-col rounded-xl p-7">
							<h3 class="text-xl font-semibold text-[var(--text-primary)]">{channel.title}</h3>
							<p class="mt-3 flex-1 leading-7 text-[var(--text-secondary)]">{channel.description}</p>
							<a
								href={channel.href}
								class={channel.primary ? 'realigned-primary-button mt-6 w-fit' : 'realigned-secondary-button mt-6 w-fit'}
								target={channel.external ? '_blank' : undefined}
								rel={channel.external ? 'noreferrer' : undefined}
							>
								{channel.label}
							</a>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section aria-labelledby="support-tips-title" class="bg-[var(--bg-base)] py-16 sm:py-20">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="max-w-3xl">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Support</p>
					<h2 id="support-tips-title" class="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">What to include when you contact support</h2>
					<p class="mt-5 text-lg leading-8 text-[var(--text-secondary)]">Good context helps us reproduce the problem and answer on the first reply. Include:</p>
					<ul class="mt-5 grid gap-3 leading-7 text-[var(--text-secondary)] sm:grid-cols-2">
						<li>the map type (static or board-backed) and the Jira project where the problem occurs;</li>
						<li>the steps you took and the result you expected;</li>
						<li>the exact error message, if one appears;</li>
						<li>a screenshot with sensitive issue data removed.</li>
					</ul>
					<p class="mt-5 leading-7 text-[var(--text-secondary)]">Do not send passwords, API tokens, or confidential issue descriptions. Installation, trials, licensing, and updates are handled by the Atlassian Marketplace, so those questions can also be raised on the app listing.</p>
				</div>
			</div>
		</section>

		<section aria-labelledby="details-title" class="bg-[var(--bg-base)] py-16 sm:py-20">
			<div class="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:px-8">
				<div>
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Company</p>
					<h2 id="details-title" class="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Realigned Technologies</h2>
					<p class="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
						A Swiss software company building focused apps for product and delivery teams worldwide.
					</p>
					<p class="mt-4 leading-7 text-[var(--text-secondary)]">
						For security and privacy questions, start with the <a class="font-semibold text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="/trust">Trust Center</a>. To report a security concern, email <a class="font-semibold text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="mailto:info@realigned.io">info@realigned.io</a>.
					</p>
					<p class="mt-4 leading-7 text-[var(--text-secondary)]">
						Looking for a different Realigned product? See all <a class="font-semibold text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="https://realigned.io/contact?utm_source=portfoliomapping_site" rel="noreferrer">contact options on realigned.io</a>.
					</p>
				</div>

				<div class="realigned-card rounded-xl p-7">
					<h3 class="text-lg font-semibold text-[var(--text-primary)]">Contact details</h3>
					<address class="mt-4 not-italic leading-7 text-[var(--text-secondary)]">
						<strong class="font-semibold text-[var(--text-primary)]">Realigned Technologies Ltd</strong><br />
						Suurstoffi 16<br />
						CH-6343 Rotkreuz<br />
						Switzerland
					</address>
					<dl class="mt-5 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
						<div>
							<dt class="font-semibold text-[var(--text-primary)]">Email</dt>
							<dd><a class="text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href="mailto:info@realigned.io">info@realigned.io</a></dd>
						</div>
						<div>
							<dt class="font-semibold text-[var(--text-primary)]">Support</dt>
							<dd><a class="text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href={SUPPORT_PORTAL} target="_blank" rel="noreferrer">Realigned support portal</a></dd>
						</div>
						<div>
							<dt class="font-semibold text-[var(--text-primary)]">Atlassian Marketplace</dt>
							<dd><a class="text-[var(--accent-cyan)] no-underline hover:text-[var(--action-hover)]" href={MARKETPLACE} target="_blank" rel="noreferrer">Denkplan Portfolio Maps listing</a></dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	</main>
</SiteShell>
