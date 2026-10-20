<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { canonicalUrlFor, siteOrigin } from '$lib/seo/canonical.js';
	
	let { title, description } = $props();
	let canonicalUrl = $derived(canonicalUrlFor($page.url.pathname));
	let shareImageUrl = `${siteOrigin}/DenkplanOG2.png`;
	
	onMount(() => {
		if (title) {
			document.title = title;
		}
		
		// Set meta description
		if (description) {
			let metaDescription = document.querySelector('meta[name="description"]');
			if (!metaDescription) {
				metaDescription = document.createElement('meta');
				metaDescription.name = 'description';
				document.head.appendChild(metaDescription);
			}
			metaDescription.content = description;
		}
	});
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{/if}
	
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={shareImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={shareImageUrl} />
</svelte:head>
