# Algebrik Agent Guide

This endpoint exists to help automated agents discover machine-readable resources for `https://algebrik.ai`.

## Discovery Endpoints

- API catalog: `https://algebrik.ai/.well-known/api-catalog.json`
- Sitemap: `https://algebrik.ai/sitemap.xml`

## Content Preference Signals

The site publishes `Content-Signal` directives in `https://algebrik.ai/robots.txt`.

## Markdown Access

For static export deployments, markdown content negotiation should be enabled at the edge layer (for example, Cloudflare Markdown for Agents) so requests with `Accept: text/markdown` can receive markdown responses.
