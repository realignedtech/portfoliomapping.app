# Denkplan Portfolio Maps for Jira

## Product

Denkplan Portfolio Maps for Jira connects portfolio strategy to live Jira delivery work. Teams can create visual maps across projects, organize initiatives around goals and hierarchy levels, plan with releases, sprints, or custom fields, and edit Jira issues directly from the map.

The Atlassian Marketplace listing is `1226527`. Installation, evaluation, licensing, and updates are handled through Atlassian Marketplace.

## Site architecture

- SvelteKit 2 and Svelte 5
- Static generation with `@sveltejs/adapter-static`
- Tailwind CSS 3
- mdsvex documentation routes
- Shared Realigned navigation, footer, Trust Center, SEO, and Umami patterns from the Story Mapping site

The legacy Next.js site (source `stefan-ernst/storymapping-site-2`, `sites/portfoliomapping`, still live on Netlify during rollout) is the content source of record. This workspace is the new implementation and must not invent capabilities, customer claims, or proof that are absent from the product documentation.

## Brand and URLs

- Product: Denkplan Portfolio Maps for Jira
- Site: `https://portfoliomapping.app`
- Marketplace: `https://marketplace.atlassian.com/apps/1226527`
- Product icon: `/denkplan.png`
- Social image: `/DenkplanOG2.png`
- Publisher: Realigned Technologies GmbH (Atlassian Marketplace vendor: Realigned Technologies Ltd.)

## Principles

1. Keep Jira as the source of truth.
2. Show the product with real screenshots rather than unsupported claims.
3. Make documentation and security information easy for existing customers to find.
4. Preserve the exact product name and distinguish portfolio mapping from story mapping.
