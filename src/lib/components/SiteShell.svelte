<script>
	import Header from './Header.svelte';

	let {
		headTitle,
		description,
		navTitle = 'Denkplan Portfolio Maps',
		highlight = '',
		marketplaceLink = 'https://marketplace.atlassian.com/apps/1226527',
		demoLink = '',
		headingInNav = false,
		wide = false,
		subnav,
		children
	} = $props();
</script>

<div class="bg-[var(--bg-base)] text-[var(--text-primary)]">
	<Header title={headTitle} {description} />
	{#if subnav}{@render subnav()}{/if}
	{@render children()}
</div>
