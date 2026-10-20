<script>
	import { page } from '$app/stores';

	let { wide = false } = $props();
	const year = new Date().getFullYear();
	let sourcePage = $derived($page.url.pathname === '/' ? '/' : $page.url.pathname.replace(/\/+$/, ''));
</script>

<footer class="w-full border-t border-[var(--footer-border)] bg-gradient-to-b from-transparent to-black/40 text-white backdrop-blur-sm">
	<div class="mx-auto px-4 py-12 transition-[max-width] duration-300 ease-in-out sm:px-6 lg:px-8 lg:py-16 {wide ? 'max-w-[90rem]' : 'max-w-7xl'}">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
			<div class="col-span-2 md:col-span-1">
				<img src="/Realigned.svg" width="140" height="40" loading="lazy" decoding="async" alt="Realigned Technologies" class="mb-4 h-9 w-auto" />
				<p class="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">Focused Jira apps for product and delivery teams, built by Realigned Technologies Ltd.</p>
				<div class="mt-5 flex items-center gap-4">
					<a class="text-[var(--text-secondary)] transition-colors hover:text-white" href="https://twitter.com/RealignedT" aria-label="Realigned on Twitter" rel="noreferrer">
						<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
					</a>
					<a class="text-[var(--text-secondary)] transition-colors hover:text-white" href="https://www.linkedin.com/company/realigned-technologies-ltd/" aria-label="Realigned on LinkedIn" rel="noreferrer">
						<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.048c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.119 20.452H3.554V9H7.12v11.452Z" /></svg>
					</a>
				</div>
			</div>
			<div>
				<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Product</h2>
				<ul class="space-y-3 text-sm text-[var(--text-secondary)]">
					<li>
						<a class="transition-colors hover:text-white" href="/">Denkplan Portfolio Maps</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="https://marketplace.atlassian.com/apps/1226527" target="_blank" rel="noreferrer">Atlassian Marketplace</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="https://demo.userstorymap.net/projects/DPFJ?selectedItem=tech.realigned.portfoliomap:sidebar-item#/map/1663578993374" target="_blank" rel="noreferrer">Live demo</a>
					</li>
				</ul>
			</div>
			<div>
				<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Resources</h2>
				<ul class="space-y-3 text-sm text-[var(--text-secondary)]">
					<li>
						<a class="transition-colors hover:text-white" href="/docs" data-umami-event="docs_journey" data-umami-event-destination="/docs" data-umami-event-source-page={sourcePage} data-umami-event-placement="footer">Documentation</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="/docs/support" data-umami-event="docs_journey" data-umami-event-destination="/docs/support" data-umami-event-source-page={sourcePage} data-umami-event-placement="footer">Support</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="/blog">Blog</a>
					</li>
				</ul>
			</div>
			<div>
				<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
				<ul class="space-y-3 text-sm text-[var(--text-secondary)]">
					<li>
						<a class="transition-colors hover:text-white" href="/trust">Trust Center</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="/trust/privacy-policy">Privacy Policy</a>
					</li>
					<li>
						<a class="transition-colors hover:text-white" href="/docs/support/eula">End User License Agreement</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--footer-border)] pt-8 text-sm text-white/50 sm:flex-row">
			<p>Copyright © {year} Realigned Technologies Ltd. All rights reserved.</p>
			<a class="transition-colors hover:text-white" href="https://realigned.io?utm_source=portfoliomapping_site" rel="noreferrer">realigned.io</a>
		</div>
	</div>
</footer>
