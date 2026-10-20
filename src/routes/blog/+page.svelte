<script>
	import SiteShell from '$lib/components/SiteShell.svelte';
	const marketplaceLink = 'https://marketplace.atlassian.com/apps/1226527';
</script>

<SiteShell headTitle="Portfolio Mapping for Jira blog" description="Guides and practical advice for portfolio management in Jira." highlight="Blog" {marketplaceLink}>
	<main class="realigned-dark-gradient min-h-[60vh] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<div class="mx-auto max-w-5xl">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Portfolio Mapping blog</p>
			<h1 class="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Plan the portfolio with Jira data in view.</h1>
			<p class="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">Practical guidance for connecting strategic planning to the projects and issues your teams already manage in Jira.</p>
			<a href="/articles/portfolio-management-with-jira" class="realigned-card group mt-12 block rounded-xl p-7 transition hover:-translate-y-1 hover:border-sky-300/40 sm:p-9">
				<time class="text-sm text-[var(--text-muted)]" datetime="2022-10-06">October 6, 2022</time>
				<h2 class="mt-3 text-2xl font-semibold text-white group-hover:text-sky-200 sm:text-3xl">How to do Portfolio Management with Jira Software</h2>
				<p class="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">A practical introduction to project portfolio management in Jira and how a portfolio map connects strategy to live delivery work.</p>
				<span class="mt-6 inline-block font-semibold text-sky-200">Read the article <span aria-hidden="true">→</span></span>
			</a>
		</div>
	</main>
</SiteShell>
