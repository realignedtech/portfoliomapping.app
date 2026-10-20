<script>
	let mode = $state('horizon');
	let menuOpen = $state(false);

	/** Card currently being dragged: { lane, col, index }. */
	let dragging = $state(null);
	/** Cell the pointer is over during a drag: { lane, col }. */
	let dropTarget = $state(null);

	const activities = [
		{ title: 'Customer Experience', key: 'PFM-1' },
		{ title: 'Operational Excellence', key: 'PFM-2' },
		{ title: 'Platform Modernization', key: 'PFM-3' },
		{ title: 'Market Expansion', key: 'PFM-4' },
		{ title: 'Risk & Compliance', key: 'PFM-5' }
	];

	// Each lane holds one array of cards per activity column. Cards move between
	// cells on drop, so this is $state rather than a frozen fixture.
	let boards = $state({
		horizon: {
			label: 'Planning horizons',
			lanes: [
				{
					name: 'Now',
					meta: 'Committed',
					columns: [
						[
							{ title: 'Unified customer portal', key: 'PFM-10', type: 'task', est: 8, status: 'progress' },
							{ title: 'Mobile service experience', key: 'PFM-31', type: 'task', est: 5, status: 'todo' }
						],
						[{ title: 'Automate order fulfilment', key: 'PFM-9', type: 'story', est: 6, status: 'progress' }],
						[{ title: 'Cloud data platform', key: 'PFM-6', type: 'story', est: 8, status: 'done' }],
						[
							{
								title: 'Launch in DACH region',
								key: 'PFM-7',
								type: 'story',
								est: 5,
								priority: true,
								status: 'progress'
							}
						],
						[{ title: 'EU data controls', key: 'PFM-12', type: 'task', est: 3, status: 'done' }]
					]
				},
				{
					name: 'Next',
					meta: 'Candidate',
					columns: [
						[],
						[{ title: 'Shared services operating model', key: 'PFM-8', type: 'task', est: 3, status: 'todo' }],
						[{ title: 'Consolidate identity systems', key: 'PFM-13', type: 'story', est: 7, status: 'progress' }],
						[{ title: 'North America launch', key: 'PFM-11', type: 'task', est: 5, status: 'todo' }],
						[]
					]
				}
			]
		},
		release: {
			label: 'Releases',
			lanes: [
				{
					name: 'FY27 H1',
					meta: 'Strategic release',
					columns: [
						[{ title: 'Unified customer portal', key: 'PFM-10', type: 'task', est: 8, status: 'progress' }],
						[
							{ title: 'Automate order fulfilment', key: 'PFM-9', type: 'story', est: 6, status: 'progress' },
							{ title: 'Shared services model', key: 'PFM-8', type: 'task', est: 3, status: 'todo' }
						],
						[{ title: 'Cloud data platform', key: 'PFM-6', type: 'story', est: 8, status: 'done' }],
						[
							{
								title: 'Launch in DACH region',
								key: 'PFM-7',
								type: 'story',
								est: 5,
								priority: true,
								status: 'progress'
							}
						],
						[{ title: 'EU data controls', key: 'PFM-12', type: 'task', est: 3, status: 'done' }]
					]
				},
				{
					name: 'Unscheduled',
					meta: 'No target date',
					columns: [
						[{ title: 'Customer insights hub', key: 'PFM-32', type: 'task', est: 5, status: 'todo' }],
						[],
						[{ title: 'Consolidate identity systems', key: 'PFM-13', type: 'story', est: 7, status: 'progress' }],
						[{ title: 'North America launch', key: 'PFM-11', type: 'task', est: 5, status: 'todo' }],
						[]
					]
				}
			]
		}
	});

	const board = $derived(boards[mode]);

	/**
	 * Swimlane badges sum story points per status category — matching the app,
	 * where an unestimated issue contributes nothing to the total.
	 */
	function laneTotals(lane) {
		const totals = { todo: 0, progress: 0, done: 0 };
		for (const column of lane.columns) {
			for (const item of column) totals[item.status] += item.est ?? 0;
		}
		return totals;
	}

	function startDrag(event, lane, col, index) {
		dragging = { lane, col, index };
		event.dataTransfer.effectAllowed = 'move';
		// Firefox only starts a drag once some payload is set.
		event.dataTransfer.setData('text/plain', boards[mode].lanes[lane].columns[col][index].key);
	}

	/**
	 * Where the card would land in this cell, from the pointer position: the
	 * index it would take, plus the y offset to draw the insertion line at.
	 * Indices count the dragged card itself, which is still in the DOM.
	 */
	function resolveDropSlot(cell, clientY) {
		const bounds = cell.getBoundingClientRect();
		const cards = [...cell.children].filter((child) => child.tagName === 'ARTICLE');

		for (let i = 0; i < cards.length; i++) {
			const rect = cards[i].getBoundingClientRect();
			if (clientY < rect.top + rect.height / 2) {
				return { index: i, offset: rect.top - bounds.top - 1 };
			}
		}

		const last = cards[cards.length - 1];
		return {
			index: cards.length,
			offset: last ? last.getBoundingClientRect().bottom - bounds.top + 1 : 0
		};
	}

	function dragOverCell(event, lane, col) {
		if (!dragging) return;
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		const { index, offset } = resolveDropSlot(event.currentTarget, event.clientY);
		dropTarget = { lane, col, index, offset };
	}

	function leaveCell(event, lane, col) {
		// dragleave also fires when crossing into a child card; ignore those.
		if (event.currentTarget.contains(event.relatedTarget)) return;
		if (dropTarget?.lane === lane && dropTarget?.col === col) dropTarget = null;
	}

	function dropOnCell(event, lane, col) {
		if (!dragging || !dropTarget) return;
		event.preventDefault();

		const lanes = boards[mode].lanes;
		const source = lanes[dragging.lane].columns[dragging.col];
		const target = lanes[lane].columns[col];
		const sameCell = dragging.lane === lane && dragging.col === col;
		let to = dropTarget.index;

		// Dropping either side of the card's own position changes nothing.
		if (sameCell && (to === dragging.index || to === dragging.index + 1)) {
			endDrag();
			return;
		}

		const [item] = source.splice(dragging.index, 1);
		if (!item) {
			endDrag();
			return;
		}

		// Removing from the same array shifts every later index down by one.
		if (sameCell && to > dragging.index) to -= 1;
		target.splice(to, 0, item);
		endDrag();
	}

	function endDrag() {
		dragging = null;
		dropTarget = null;
	}

	function select(next) {
		mode = next;
		menuOpen = false;
	}
</script>

{#snippet typeIcon(type)}
	{#if type === 'epic'}
		<svg class="type-icon epic" viewBox="0 0 16 16" aria-hidden="true">
			<rect class="tile" width="16" height="16" rx="3" />
			<path class="glyph" d="M9.7 2.9 4.7 9.2h2.7l-.9 4.1 5-6.4H8.9l.8-4Z" />
		</svg>
	{:else if type === 'story'}
		<svg class="type-icon story" viewBox="0 0 16 16" aria-hidden="true">
			<rect class="tile" width="16" height="16" rx="3" />
			<path class="glyph" d="M5.1 3.9h5.8v8.4L8 10.2l-2.9 2.1V3.9Z" />
		</svg>
	{:else if type === 'bug'}
		<svg class="type-icon bug" viewBox="0 0 16 16" aria-hidden="true">
			<rect class="tile" width="16" height="16" rx="3" />
			<circle class="glyph" cx="8" cy="8" r="2.7" />
		</svg>
	{:else}
		<svg class="type-icon task" viewBox="0 0 16 16" aria-hidden="true">
			<rect class="tile" width="16" height="16" rx="3" />
			<path
				class="glyph-stroke"
				d="M4.6 8.3 6.9 10.6l4.5-4.9"
				stroke-width="1.8"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
{/snippet}

{#snippet card(item, lane, col, index)}
	<article
		class="card story-card"
		class:is-dragging={dragging?.lane === lane && dragging?.col === col && dragging?.index === index}
		role="listitem"
		draggable="true"
		ondragstart={(event) => startDrag(event, lane, col, index)}
		ondragend={endDrag}
	>
		<div class="card-head">
			<p>{item.title}</p>
			<svg class="dots" viewBox="0 0 4 16" aria-hidden="true">
				<circle cx="2" cy="4" r="1.4" /><circle cx="2" cy="8" r="1.4" /><circle cx="2" cy="12" r="1.4" />
			</svg>
		</div>
		<div class="card-meta">
			{@render typeIcon(item.type)}
			<span class="key">{item.key}</span>
			{#if item.priority}
				<svg class="priority" viewBox="0 0 12 12" aria-hidden="true">
					<path d="M2 4.4h8M2 7.6h8" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			{/if}
			<span class="meta-spacer"></span>
			{#if item.est}<span class="estimate">{item.est}</span>{/if}
			<span class="status {item.status}"></span>
		</div>
	</article>
{/snippet}

<div class="demo-frame" aria-label="Interactive preview of a Denkplan portfolio map in Jira">
	<div class="browser-bar">
		<div class="traffic-lights" aria-hidden="true"><span></span><span></span><span></span></div>
		<div class="browser-address">Denkplan Portfolio Maps for Jira</div>
	</div>

	<div class="app">
		<header class="app-header">
			<div class="titles">
				<span class="breadcrumb">Portfolio Maps for Jira</span>
				<p class="map-title">Company Portfolio</p>
			</div>

			<div class="actions">
				<button class="icon-button" type="button" aria-label="Collapse all">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M6.6 9.4 2.6 13.4M6.6 9.4H3.9M6.6 9.4v2.7M9.4 6.6l4-4M9.4 6.6h2.7M9.4 6.6V3.9"
							fill="none"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<span class="divider" aria-hidden="true"></span>

				<button class="primary-button" type="button">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path d="M8 3.5v9M3.5 8h9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
					</svg>
					Add
				</button>

				<button class="pill-button hide-tiny" type="button">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
					Filters
				</button>

				<button class="text-button hide-small" type="button">Projects</button>

				<div class="menu-anchor">
					<button
						class="pill-button"
						type="button"
						aria-haspopup="menu"
						aria-expanded={menuOpen}
						onclick={() => (menuOpen = !menuOpen)}
					>
						Swimlanes
						<svg class="chevron" class:flip={menuOpen} viewBox="0 0 16 16" aria-hidden="true">
							<path d="m4 6.5 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>

					{#if menuOpen}
						<div class="menu" role="menu">
							<button role="menuitemradio" aria-checked={mode === 'horizon'} type="button" onclick={() => select('horizon')}>
								<span class="check">{mode === 'horizon' ? '✓' : ''}</span> Planning horizons
							</button>
							<button role="menuitemradio" aria-checked={mode === 'release'} type="button" onclick={() => select('release')}>
								<span class="check">{mode === 'release' ? '✓' : ''}</span> Releases
							</button>
						</div>
					{/if}
				</div>

				<span class="divider hide-small" aria-hidden="true"></span>

				<button class="icon-button hide-small" type="button" aria-label="Layers">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M8 2.2 14.2 5.6 8 9 1.8 5.6 8 2.2ZM2.6 8.6 8 11.6l5.4-3M2.6 11.4 8 14.4l5.4-3"
							fill="none"
							stroke="currentColor"
							stroke-width="1.3"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button class="icon-button" type="button" aria-label="More options">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<circle cx="3.4" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="12.6" cy="8" r="1.5" />
					</svg>
				</button>
			</div>
		</header>

		{#if menuOpen}
			<button class="menu-backdrop" type="button" aria-label="Close menu" onclick={() => (menuOpen = false)}></button>
		{/if}

		<div class="board-wrap">
			<div class="board">
				<div class="row">
					{#each activities as activity}
						<article class="card activity">
							<div class="card-head">
								<p>{activity.title}</p>
								<svg class="dots" viewBox="0 0 4 16" aria-hidden="true">
									<circle cx="2" cy="4" r="1.4" /><circle cx="2" cy="8" r="1.4" /><circle cx="2" cy="12" r="1.4" />
								</svg>
							</div>
							<div class="card-meta">
								{@render typeIcon('epic')}
								<span class="key">{activity.key}</span>
								<span class="meta-spacer"></span>
								<span class="status neutral"></span>
							</div>
						</article>
					{/each}
				</div>

				{#each board.lanes as lane, laneIndex}
					{@const totals = laneTotals(lane)}
					<div class="lane-header">
						<svg class="lane-collapse" viewBox="0 0 16 16" aria-hidden="true">
							<path
								d="M6.6 9.4 2.6 13.4M6.6 9.4H3.9M6.6 9.4v2.7M9.4 6.6l4-4M9.4 6.6h2.7M9.4 6.6V3.9"
								fill="none"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="lane-name">{lane.name}</span>
						{#if lane.action}
							<button class="lane-action" type="button">{lane.action}</button>
						{/if}
						{#if lane.meta}
							<span class="lane-meta">{lane.meta}</span>
						{/if}
						<span class="counts" aria-label="Story points by status">
							<i class="count todo">{totals.todo}</i>
							<i class="count progress">{totals.progress}</i>
							<i class="count done">{totals.done}</i>
						</span>
					</div>

					<div class="row lane-row">
						{#each lane.columns as column, colIndex}
							<div
								class="cell"
								class:drop-active={dropTarget?.lane === laneIndex && dropTarget?.col === colIndex}
								role="list"
								aria-label={`${lane.name}, ${activities[colIndex].title}`}
								ondragover={(event) => dragOverCell(event, laneIndex, colIndex)}
								ondragleave={(event) => leaveCell(event, laneIndex, colIndex)}
								ondrop={(event) => dropOnCell(event, laneIndex, colIndex)}
							>
								{#each column as item, index (item.key)}
									{@render card(item, laneIndex, colIndex, index)}
								{/each}
								{#if dropTarget?.lane === laneIndex && dropTarget?.col === colIndex}
									<div class="drop-line" style="top: {dropTarget.offset}px"></div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	/*
	 * The mockup renders Jira's light UI inside a dark marketing page, so it
	 * carries its own token layer rather than inheriting the site's tokens.
	 * Values track the Atlassian Design System light theme.
	 */
	.demo-frame {
		--jira-surface: #ffffff;
		--jira-surface-sunken: #f7f8f9;
		--jira-surface-chrome: #f1f2f4;

		--jira-text: #172b4d;
		--jira-text-subtle: #44546f;
		--jira-text-subtlest: #626f86;
		--jira-text-inverse: #ffffff;
		--jira-link: #0c66e4;

		--jira-border: rgba(9, 30, 66, 0.14);
		--jira-border-subtle: rgba(9, 30, 66, 0.09);

		--jira-brand-bold: #0c66e4;
		--jira-brand-bold-hovered: #0055cc;
		--jira-brand-bold-pressed: #09326c;

		--jira-neutral: rgba(9, 30, 66, 0.06);
		--jira-neutral-hovered: rgba(9, 30, 66, 0.14);
		--jira-neutral-pressed: rgba(9, 30, 66, 0.21);

		--jira-selected: #e9f2ff;
		--jira-selected-border: #0c66e4;

		--jira-status-todo: #44546f;
		--jira-status-progress: #f5cd47;
		--jira-status-done: #22a06b;
		--jira-status-none: #dcdfe4;

		--jira-type-epic: #8270db;
		--jira-type-story: #4bad4e;
		--jira-type-task: #2684ff;
		--jira-type-bug: #e5493a;
		--jira-priority-medium: #e9832a;

		--jira-shadow-raised: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px rgba(9, 30, 66, 0.14);
		--jira-shadow-overlay: 0 4px 12px rgba(9, 30, 66, 0.24);

		container-type: inline-size;
		width: 100%;
		min-width: 0;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 0.5rem;
		background: var(--jira-surface);
		box-shadow: 0 30px 80px rgba(2, 15, 39, 0.36);
		color: var(--jira-text);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.browser-bar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 18px;
		height: 34px;
		padding: 0 13px;
		border-bottom: 1px solid var(--jira-border);
		background: var(--jira-surface-chrome);
		font-size: 11px;
	}

	.traffic-lights { display: flex; gap: 5px; }
	.traffic-lights span { width: 8px; height: 8px; border-radius: 50%; background: #ff5f57; }
	.traffic-lights span:nth-child(2) { background: #febc2e; }
	.traffic-lights span:nth-child(3) { background: #28c840; }

	/* Out of flow so it centres on the bar, not on the space left of the lights. */
	.browser-address {
		position: absolute;
		left: 50%;
		width: min(330px, 58%);
		transform: translateX(-50%);
		overflow: hidden;
		border: 1px solid var(--jira-border);
		border-radius: 5px;
		background: var(--jira-surface);
		padding: 4px 12px;
		color: var(--jira-text-subtlest);
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* Everything below scales with the frame width. */
	.app {
		position: relative;
		min-width: 0;
		background: var(--jira-surface);
		font-size: clamp(8px, 1.06cqw, 11px);
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
		padding: 1.15em 1.4em;
		border-bottom: 1px solid var(--jira-border-subtle);
		background: var(--jira-surface);
	}

	.breadcrumb { display: block; color: var(--jira-link); font-size: 1em; font-weight: 500; }
	.titles .map-title {
		margin: 0.25em 0 0;
		color: var(--jira-text);
		font-size: 2.55em;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.1;
		white-space: nowrap;
	}

	.actions { display: flex; flex: none; align-items: center; gap: 0.55em; }

	/* :where() keeps the reset at zero specificity so the variants below win. */
	:where(.actions button) {
		border: 0;
		border-radius: 0.35em;
		background: transparent;
		color: var(--jira-text-subtle);
		font: inherit;
		font-size: 1.25em;
		font-weight: 500;
	}
	:where(.actions svg) { width: 1.25em; height: 1.25em; fill: currentColor; }

	.icon-button { display: grid; width: 2.1em; height: 2.1em; place-items: center; color: var(--jira-text-subtlest); }
	.icon-button:hover { background: var(--jira-neutral); }
	.icon-button:active { background: var(--jira-neutral-hovered); }
	.divider { width: 1px; height: 1.9em; background: var(--jira-border); }

	.primary-button {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		padding: 0.5em 0.85em;
		background: var(--jira-brand-bold);
		color: var(--jira-text-inverse);
		font-weight: 600;
	}
	.primary-button:hover { background: var(--jira-brand-bold-hovered); }
	.primary-button:active { background: var(--jira-brand-bold-pressed); }
	.primary-button svg { fill: none; }

	.pill-button {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		padding: 0.5em 0.75em;
		background: var(--jira-neutral);
		color: var(--jira-text-subtle);
	}
	.pill-button:hover { background: var(--jira-neutral-hovered); }
	.pill-button:active { background: var(--jira-neutral-pressed); }
	.pill-button svg { fill: none; }

	.text-button { padding: 0.5em 0.6em; }
	.text-button:hover { background: var(--jira-neutral); }
	.text-button:active { background: var(--jira-neutral-hovered); }

	.chevron { transition: transform 0.15s ease; }
	.chevron.flip { transform: rotate(180deg); }

	.menu-anchor { position: relative; }
	.menu {
		position: absolute;
		right: 0;
		top: calc(100% + 0.4em);
		z-index: 3;
		min-width: 11em;
		overflow: hidden;
		border-radius: 0.4em;
		background: var(--jira-surface);
		padding: 0.35em 0;
		box-shadow: var(--jira-shadow-overlay);
	}
	.menu button {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5em;
		border-radius: 0;
		padding: 0.55em 0.9em;
		text-align: left;
	}
	.menu button:hover { background: var(--jira-neutral); }
	.menu .check { width: 1em; color: var(--jira-link); font-weight: 700; }

	.menu-backdrop { position: absolute; inset: 0; z-index: 2; border: 0; background: transparent; }

	.board-wrap { width: 100%; min-width: 0; overflow: hidden; background: var(--jira-surface-sunken); }
	.board { min-width: 56em; padding: 1.2em 1.3em 1.6em; }

	.row { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.75em; }

	.card {
		overflow: hidden;
		border: 1px solid var(--jira-border-subtle);
		border-radius: 0.35em;
		background: var(--jira-surface);
		padding: 0.75em 0.8em 0.65em;
		box-shadow: var(--jira-shadow-raised);
	}

	.card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.4em; }
	.card-head p { margin: 0; color: var(--jira-text); font-size: 1.3em; font-weight: 400; line-height: 1.3; }
	.dots { flex: none; width: 0.35em; height: 1.4em; fill: var(--jira-text-subtlest); }

	.card-meta { display: flex; align-items: center; gap: 0.4em; margin-top: 0.7em; }
	.key { color: var(--jira-link); font-size: 1.25em; font-weight: 400; white-space: nowrap; }
	.meta-spacer { flex: 1; }
	.estimate {
		border-radius: 0.25em;
		background: var(--jira-neutral);
		padding: 0.15em 0.5em;
		color: var(--jira-text-subtle);
		font-size: 1.1em;
		font-weight: 600;
	}

	.type-icon { flex: none; width: 1.45em; height: 1.45em; }
	.type-icon .glyph { fill: var(--jira-text-inverse); }
	.type-icon .glyph-stroke { fill: none; stroke: var(--jira-text-inverse); }
	.type-icon.epic .tile { fill: var(--jira-type-epic); }
	.type-icon.story .tile { fill: var(--jira-type-story); }
	.type-icon.task .tile { fill: var(--jira-type-task); }
	.type-icon.bug .tile { fill: var(--jira-type-bug); }

	.priority { width: 1.2em; height: 1.2em; fill: none; stroke: var(--jira-priority-medium); }

	.status { flex: none; width: 1.5em; height: 1.5em; border-radius: 0.2em; background: var(--jira-status-todo); }
	.status.progress { background: var(--jira-status-progress); }
	.status.done { background: var(--jira-status-done); }
	.status.neutral { background: var(--jira-status-none); }

	.activity .card-head p { font-weight: 500; }

	.lane-header { display: flex; align-items: center; gap: 0.7em; padding: 1.5em 0 0.9em; }
	.lane-collapse { width: 1.3em; height: 1.3em; color: var(--jira-text-subtlest); }
	.lane-name { color: var(--jira-text); font-size: 1.4em; font-weight: 500; white-space: nowrap; }
	.lane-action {
		border: 0;
		border-radius: 0.35em;
		background: var(--jira-brand-bold);
		padding: 0.45em 0.8em;
		color: var(--jira-text-inverse);
		font: inherit;
		font-size: 1.25em;
		font-weight: 600;
	}
	.lane-action:hover { background: var(--jira-brand-bold-hovered); }
	.lane-action:active { background: var(--jira-brand-bold-pressed); }
	.lane-meta { color: var(--jira-text-subtlest); font-size: 1.2em; }

	.counts { display: flex; gap: 0.35em; }
	.count {
		display: grid;
		min-width: 1.9em;
		height: 1.9em;
		place-items: center;
		border-radius: 0.25em;
		padding: 0 0.35em;
		font-size: 1.15em;
		font-style: normal;
		font-weight: 600;
	}
	.count.todo { background: var(--jira-status-todo); color: var(--jira-text-inverse); }
	.count.progress { background: var(--jira-status-progress); color: var(--jira-text); }
	.count.done { background: var(--jira-status-done); color: var(--jira-text-inverse); }

	.lane-row .cell {
		position: relative;
		display: flex;
		min-height: 9em;
		flex-direction: column;
		gap: 0.3em;
		border-radius: 0.25em;
		background: var(--jira-neutral);
		transition: background 0.12s ease;
	}

	.lane-row .cell.drop-active { background: var(--jira-selected); }

	/* Cards are opaque and fill the cell, so both cues are painted over them. */
	.lane-row .cell.drop-active::after {
		content: '';
		position: absolute;
		z-index: 1;
		border: 1px solid var(--jira-selected-border);
		border-radius: 0.25em;
		inset: 0;
		pointer-events: none;
	}

	/* Absolutely positioned so showing it never shifts the cards it measures. */
	.drop-line {
		position: absolute;
		z-index: 2;
		right: 0;
		left: 0;
		height: 2px;
		border-radius: 1px;
		background: var(--jira-selected-border);
		pointer-events: none;
	}

	.story-card { cursor: grab; user-select: none; }
	.story-card:active { cursor: grabbing; }
	.story-card.is-dragging { opacity: 0.4; }

	@container (max-width: 640px) {
		.hide-small { display: none; }
		/* Below this width the board no longer fits, so fade the clipped edge. */
		.board-wrap {
			-webkit-mask-image: linear-gradient(to right, #000 86%, transparent 100%);
			mask-image: linear-gradient(to right, #000 86%, transparent 100%);
		}
	}

	/* Phone widths: the header can no longer carry the full action bar. */
	@container (max-width: 470px) {
		.hide-tiny { display: none; }
		.titles .map-title { font-size: 2.2em; }
	}
</style>
