<script>
	let { message = 'Page not found' } = $props();
</script>

<main class="bg-[var(--bg-base)] text-[var(--text-primary)]">
	<section class="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
		<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600/80">404</p>
		<h1 class="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
		<p class="mt-4 text-lg text-[var(--text-secondary)]">
			{message}. The page may have moved, or the address may be wrong.
		</p>
		<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
			<a href="/" class="rounded-lg bg-cyan-600 px-6 py-3 text-base font-semibold text-white hover:bg-cyan-500">Go to the homepage</a>
			<a href="/docs" class="rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-base font-semibold hover:bg-black/5">Browse the documentation</a>
		</div>
	</section>
</main>
