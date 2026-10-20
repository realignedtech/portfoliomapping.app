<script>
	import { page } from '$app/stores';
	import { canonicalPathFor } from '$lib/seo/canonical.js';

	let {
		navigation = [],
		currentRoute = '/',
		active = '/',
		isPro = false,
		onnavigate = () => {}
	} = $props();

	let query = $state('');
	let sourcePage = $derived($page.url.pathname === '/' ? '/' : $page.url.pathname.replace(/\/+$/, ''));
	let filteredNavigation = $derived.by(() => {
		const term = query.trim().toLowerCase();
		if (!term) return navigation;

		return navigation
			.map((item) => {
				const children = item.children?.filter((child) => child.title.toLowerCase().includes(term));
				if (item.title.toLowerCase().includes(term)) return item;
				if (children?.length) return { ...item, children };
				return null;
			})
			.filter(Boolean);
	});

	function childHref(item, child) {
		return canonicalPathFor(`/docs${child.link}`);
	}

	function itemHref(item) {
		return canonicalPathFor(`/docs${item.link === '/' ? '' : item.link}`);
	}
</script>

<div class="docs-sidebar">
	<div class="mb-5 flex items-center justify-between gap-3">
		<div>
			<p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Browse</p>
			<h2 class="mt-1 text-base font-semibold text-white">Documentation</h2>
		</div>
		<span class="rounded-full border border-sky-300/20 bg-sky-300/10 px-2.5 py-1 text-[0.68rem] font-semibold text-sky-200">
			Guide
		</span>
	</div>

	<label class="search-field">
		<svg class="h-4 w-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
		</svg>
		<span class="sr-only">Filter documentation</span>
		<input bind:value={query} type="search" placeholder="Find a page..." autocomplete="off" />
	</label>

	<nav aria-label="Documentation pages" class="mt-5 space-y-1">
		{#each filteredNavigation as item}
			<div>
				<a href={itemHref(item)} onclick={onnavigate} class:active={currentRoute === item.link} class="nav-row" data-umami-event="docs_journey" data-umami-event-destination={itemHref(item)} data-umami-event-source-page={sourcePage} data-umami-event-placement="docs_sidebar">
					<span>{item.title}</span>
					{#if item.children}
						<svg class:rotate-90={active === item.link || query} class="h-3.5 w-3.5 flex-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
						</svg>
					{/if}
				</a>

				{#if item.children && (active === item.link || query)}
					<div class="ml-3 mt-1 space-y-0.5 border-l border-white/10 pl-3">
						{#each item.children as child}
							<a
								href={childHref(item, child)}
								onclick={onnavigate}
								data-umami-event="docs_journey"
								data-umami-event-destination={childHref(item, child)}
								data-umami-event-source-page={sourcePage}
								data-umami-event-placement="docs_sidebar"
								class:active={currentRoute === child.link}
								class="child-row"
							>{child.title}</a>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<p class="px-3 py-4 text-sm text-[var(--text-muted)]">No matching pages.</p>
		{/each}
	</nav>
</div>

<style>
	.search-field {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		border: 1px solid rgba(156, 180, 211, 0.2);
		border-radius: 0.55rem;
		background: rgba(3, 25, 55, 0.42);
		padding: 0.65rem 0.75rem;
		color: var(--text-muted);
		transition: border-color 160ms ease, background 160ms ease;
	}

	.search-field:focus-within {
		border-color: rgba(56, 189, 248, 0.55);
		background: rgba(3, 25, 55, 0.64);
	}

	.search-field input {
		min-width: 0;
		width: 100%;
		border: 0;
		outline: 0;
		background: transparent;
		color: white;
		font-size: 0.84rem;
	}

	.search-field input::placeholder { color: var(--text-muted); }
	.search-field input::-webkit-search-cancel-button { filter: invert(1); opacity: 0.55; }

	.nav-row,
	.child-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.58rem 0.7rem;
		color: var(--text-secondary);
		font-size: 0.84rem;
		font-weight: 500;
		line-height: 1.35;
		transition: background 160ms ease, color 160ms ease;
	}

	.nav-row:hover,
	.child-row:hover { background: rgba(255, 255, 255, 0.055); color: white; }
	.nav-row.active,
	.child-row.active { background: rgba(56, 189, 248, 0.1); color: #e0f2fe; }
	.nav-row.active { box-shadow: inset 2px 0 #38bdf8; }
	.child-row { padding-block: 0.46rem; font-size: 0.79rem; }
</style>
