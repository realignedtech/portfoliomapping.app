# Denkplan Portfolio Maps for Jira — SvelteKit

Static SvelteKit implementation of `portfoliomapping.app`, using the Story Mapping site's shared Realigned architecture and the existing Portfolio Mapping content and assets.

## Development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run check
npm run build          # also regenerates build/sitemap.xml
npm run verify:export  # acceptance checks against build/
```

The generated static site is written to `build/`.

## Deployment

`deploy/` and `scripts/deploy.sh` mirror the `storymapping-next` container
route: Caddy serving the prerendered export on :8075 behind Traefik. The
deploy script builds, ships the container to the web host, restarts the
service, then runs `scripts/verify-production.mjs` against
https://portfoliomapping.app. Rollout itself is tracked as MA-91 in the
Windshift marketing workspace.
