<script>
	let {
		title = 'Documentation',
		sectionLabel = 'Denkplan Portfolio Maps documentation',
		onheadingschange = () => {},
		children
	} = $props();

	let contentElement = $state();
	let expandedImage = $state(null);

	$effect(() => {
		if (!contentElement) return;

		const collectHeadings = () => {
			const headings = [...contentElement.querySelectorAll('h2[id], h3[id]')].map((heading) => ({
				id: heading.id,
				text: heading.textContent?.trim() || '',
				level: Number(heading.tagName.slice(1))
			}));
			onheadingschange(headings);
		};

		collectHeadings();
		const observer = new MutationObserver(collectHeadings);
		observer.observe(contentElement, { childList: true, subtree: true });
		contentElement.addEventListener('click', handleContentClick);
		return () => {
			observer.disconnect();
			contentElement.removeEventListener('click', handleContentClick);
		};
	});

	function handleContentClick(event) {
		const image = event.target.closest('img');
		if (image && contentElement?.contains(image)) expandedImage = image.src;
	}

	function closeModal() {
		expandedImage = null;
	}
</script>

{#if expandedImage}
	<div class="blanket" role="dialog" tabindex="-1" aria-label="Expanded documentation image" onclick={closeModal} onkeydown={(event) => event.key === 'Escape' && closeModal()}>
		<div class="modal-image"><img src={expandedImage} alt="" class="max-h-full max-w-full" /></div>
	</div>
{/if}

<article class="docs-article">
	<header class="docs-heading">
		<div class="mb-2 flex items-center gap-2 text-xs font-semibold text-sky-200">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5s3.33.48 4.5 1.25v13C19.83 18.48 17.25 18 15.5 18s-2.33.48-3.5 1.25" />
			</svg>
			{sectionLabel}
		</div>
		<h1>{title}</h1>
	</header>

	<div bind:this={contentElement} class="docs-content">
		{@render children()}
	</div>
</article>

<style>
	.docs-article {
		min-width: 0;
		overflow: hidden;
		border: 1px solid rgba(156, 180, 211, 0.16);
		border-radius: 0.75rem;
		background: var(--bg-surface);
		box-shadow: 0 20px 50px rgba(2, 18, 42, 0.18);
	}

	.docs-heading {
		border-bottom: 1px solid rgba(156, 180, 211, 0.14);
		padding: 2rem 2.25rem 1.65rem;
		background: linear-gradient(135deg, rgba(20, 70, 126, 0.85), rgba(12, 52, 104, 0.35));
	}

	.docs-heading h1 {
		margin: 0;
		color: white;
		font-size: clamp(1.8rem, 3vw, 2.45rem);
		font-weight: 650;
		letter-spacing: -0.025em;
		line-height: 1.15;
	}

	.docs-content {
		padding: 2.25rem;
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.8;
	}

	:global(.docs-content h1),
	:global(.docs-content h2),
	:global(.docs-content h3),
	:global(.docs-content h4) {
		color: white;
		font-weight: 650;
		letter-spacing: -0.018em;
		line-height: 1.25;
		scroll-margin-top: 9rem;
	}

	:global(.docs-content h1) { margin: 0 0 1.5rem; font-size: 2rem; }
	:global(.docs-content h2) { margin: 2.5rem 0 0.85rem; font-size: 1.55rem; }
	:global(.docs-content h3) { margin: 2rem 0 0.7rem; font-size: 1.22rem; }
	:global(.docs-content h4) { margin: 1.6rem 0 0.55rem; font-size: 1.05rem; }
	:global(.docs-content h2:first-child),
	:global(.docs-content h3:first-child) { margin-top: 0; }
	:global(.docs-content p) { margin: 0.9rem 0; }
	:global(.docs-content strong) { color: #f1f7ff; font-weight: 600; }
	:global(.docs-content a) { color: #7dd3fc; font-weight: 550; text-decoration: underline; text-decoration-color: rgba(125, 211, 252, 0.35); text-underline-offset: 3px; }
	:global(.docs-content a:hover) { color: #bae6fd; text-decoration-color: currentColor; }
	:global(.docs-content h2 a),
	:global(.docs-content h3 a),
	:global(.docs-content h4 a) { color: inherit; font-weight: inherit; text-decoration: none; }
	:global(.docs-content h2 a:hover),
	:global(.docs-content h3 a:hover),
	:global(.docs-content h4 a:hover) { color: inherit; text-decoration: none; }
	:global(.docs-content ul),
	:global(.docs-content ol) { margin: 1rem 0; padding-left: 1.5rem; }
	:global(.docs-content li) { margin: 0.35rem 0; padding-left: 0.2rem; }
	:global(.docs-content li::marker) { color: #38bdf8; }
	:global(.docs-content hr) { margin: 2.25rem 0; border: 0; border-top: 1px solid rgba(156, 180, 211, 0.16); }
	:global(.docs-content blockquote) { margin: 1.4rem 0; border-left: 3px solid #38bdf8; border-radius: 0 0.5rem 0.5rem 0; background: rgba(56, 189, 248, 0.07); padding: 0.75rem 1rem; color: #c9ddf5; }
	:global(.docs-content code) { border: 1px solid rgba(156, 180, 211, 0.15); border-radius: 0.3rem; background: rgba(3, 25, 55, 0.6); padding: 0.13rem 0.35rem; color: #bae6fd; font-size: 0.86em; }
	:global(.docs-content pre) { overflow-x: auto; margin: 1.4rem 0; border: 1px solid rgba(156, 180, 211, 0.14); border-radius: 0.6rem; background: #061d3d; padding: 1.1rem 1.2rem; }
	:global(.docs-content pre code) { border: 0; background: transparent; padding: 0; color: #dbeafe; }
	:global(.docs-content table) { display: block; overflow-x: auto; width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
	:global(.docs-content th),
	:global(.docs-content td) { border: 1px solid rgba(156, 180, 211, 0.16); padding: 0.65rem 0.8rem; text-align: left; }
	:global(.docs-content th) { background: rgba(3, 25, 55, 0.35); color: white; font-weight: 600; }
	:global(.docs-content img) { max-width: 100%; height: auto; margin: 1.6rem auto; border: 1px solid rgba(156, 180, 211, 0.2); border-radius: 0.6rem; box-shadow: 0 14px 30px rgba(2, 18, 42, 0.28); cursor: zoom-in; }

	.blanket {
		position: fixed;
		inset: 0;
		z-index: 500;
		background: rgba(2, 6, 23, 0.82);
		backdrop-filter: blur(6px);
	}

	.modal-image {
		position: absolute;
		inset: 5vh 5vw;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	@media (max-width: 639px) {
		.docs-heading { padding: 1.55rem 1.35rem 1.35rem; }
		.docs-content { padding: 1.5rem 1.35rem; font-size: 0.95rem; }
	}
</style>
