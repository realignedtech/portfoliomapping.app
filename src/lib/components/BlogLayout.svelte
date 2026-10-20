<script>
	import SiteShell from './SiteShell.svelte';
	import { page } from '$app/stores';

	let { meta = {}, children } = $props();
	let sourcePage = $derived($page.url.pathname.replace(/\/$/, '') || '/');
	const marketplaceLink = 'https://marketplace.atlassian.com/apps/1226527';
</script>

<SiteShell
	headTitle={`${meta.title || 'Article'} | Denkplan Portfolio Maps`}
	description={meta.description || 'Portfolio planning guidance for Jira teams.'}
	highlight="Blog"
	{marketplaceLink}
>
	<main class="realigned-dark-gradient min-h-[60vh] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
		<article class="realigned-card mx-auto max-w-4xl overflow-hidden rounded-xl">
			<header class="border-b border-white/10 bg-gradient-to-br from-[#16477f] to-[#0c3468] px-6 py-10 sm:px-10 sm:py-14">
				<a href="/blog" class="text-sm font-semibold text-sky-200 hover:text-white">Portfolio Mapping blog</a>
				<h1 class="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">{meta.title}</h1>
				{#if meta.date}<time class="mt-5 block text-sm text-[var(--text-secondary)]" datetime={new Date(meta.date).toISOString()}>{new Date(meta.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}</time>{/if}
			</header>
			<div class="docs-content px-6 py-9 sm:px-10 sm:py-12">
				{@render children()}
				<div class="mt-12 border-t border-white/10 pt-8">
					<h2 class="!mt-0">Plan your portfolio in Jira</h2>
					<p>See how Denkplan Portfolio Maps connects goals, initiatives, and delivery work in a visual Jira plan.</p>
					<a href={marketplaceLink} target="_blank" rel="noreferrer" data-umami-event="marketplace_click" data-umami-event-product="portfolio_maps" data-umami-event-listing-id="1226527" data-umami-event-intent="trial" data-umami-event-source-page={sourcePage} data-umami-event-placement="article_footer" class="realigned-primary-button mt-4">Start a free trial</a>
				</div>
			</div>
		</article>
	</main>
</SiteShell>

<style>
	.docs-content { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; }
	.docs-content :global(h2), .docs-content :global(h3), .docs-content :global(h4) { color: white; font-weight: 650; letter-spacing: -0.018em; line-height: 1.25; }
	.docs-content :global(h2) { margin: 2.6rem 0 .9rem; font-size: 1.7rem; }
	.docs-content :global(h3) { margin: 2rem 0 .7rem; font-size: 1.3rem; }
	.docs-content :global(p) { margin: 1rem 0; }
	.docs-content :global(ol), .docs-content :global(ul) { margin: 1rem 0; padding-left: 1.6rem; }
	.docs-content :global(li) { margin: .45rem 0; }
	.docs-content :global(li::marker) { color: #38bdf8; }
	.docs-content :global(a) { color: #7dd3fc; text-decoration: underline; text-underline-offset: 3px; }
	.docs-content :global(img) { width: 100%; height: auto; margin: 2rem auto; border: 1px solid rgba(156,180,211,.2); border-radius: .6rem; box-shadow: 0 14px 30px rgba(2,18,42,.28); }
</style>
