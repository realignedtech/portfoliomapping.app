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

Deploys run from CI. **Push to `main`** and
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds a
`linux/arm64` image, pushes it to GHCR, then runs one forced-command SSH key on
the host to pull that exact commit's tag and restart the service. Pushes to
other branches and pull requests do **not** deploy; use the workflow's manual
`workflow_dispatch` trigger to run it by hand.

**Time to live: ~58s after the push** (build ~51s + deploy ~7s). The
`Verify live` job runs after that and does not affect liveness — it re-runs
`scripts/verify-production.mjs` against https://portfoliomapping.app.

- Site key `portfoliomapping` · service `portfoliomapping-next.service` · image
  `ghcr.io/realignedtech/portfoliomapping`
- Host: `core@windshift.sh` (arm64). The CI key is a forced command: it may only
  run `realigned-deploy`, which accepts `<site> <tag>` and nothing else — no
  shell, no port forwarding.
- Rollback: `ssh core@windshift.sh 'realigned-deploy portfoliomapping rollback-<timestamp>'`.
  Every deploy logs the rollback tag it created.
- Host-side setup (forced-command script + keys) lives in the infra repo:
  `hetzner/scripts/website-ci-deploy-setup.sh`, idempotent.

The manual path still works and builds on the host instead of GHCR: `deploy/`
and `scripts/deploy.sh` mirror the `storymapping-next` container route: Caddy
serving the prerendered export on :8075 behind Traefik. The deploy script
builds, ships the container to the web host, restarts the service, then runs
`scripts/verify-production.mjs` against https://portfoliomapping.app. Rollout
itself is tracked as MA-91 in the Windshift marketing workspace.
