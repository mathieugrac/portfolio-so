# Agent Context: Portfolio Anne Sophie Grac

## Project Overview

Portfolio website for **Anne Sophie Grac**, a French scenographer and costume designer. Migrated from a static HTML site (`/www`) to a dynamic SvelteKit application with a Git-based CMS, enabling the owner to update content without developer intervention.

**Live site:** https://portfolio-so.vercel.app  
**CMS admin:** https://portfolio-so.vercel.app/admin

## Stack

| Layer | Technology |
|-------|------------|
| Framework | SvelteKit 2 (Svelte 5) |
| CMS | Sveltia CMS (Decap CMS fork) |
| Hosting | Vercel |
| Auth | GitHub OAuth (custom endpoint) |
| Content | Markdown (YAML frontmatter) |

## Project Structure

```
sveltekit-portfolio/
├── src/
│   ├── content/           # CMS-managed content (Git-based)
│   │   ├── projects/      # *.md files (one per project)
│   │   ├── parcours/      # experience.yml, formation.yml
│   │   └── settings/      # site.yml
│   ├── lib/
│   │   ├── content/       # Content loading (import.meta.glob)
│   │   ├── components/    # Svelte components
│   │   └── styles/        # main.css
│   └── routes/
│       ├── +page.svelte         # Homepage (project grid)
│       ├── parcours/            # CV page
│       ├── projects/[slug]/     # Project detail (dynamic route)
│       └── api/auth/            # GitHub OAuth endpoint
├── static/
│   ├── admin/             # Sveltia CMS (config.yml, index.html)
│   └── img/               # All images (organized by project)
```

## Content Schema

### Project (`src/content/projects/*.md`)
```yaml
title: "Project Name"
slug: "url-slug"
subtitle: "Optional subtitle"
year: 2023
director: "Director Name"
cover: "/img/cover/image.jpg"
description: "About text"
distribution:
  - role: "Role"
    name: "Person Name"
blocks:
  - type: "image"
    src: "/img/project/image.jpg"
    alt: "Description"
    layout: "center|left|right"
    caption: "Optional caption"
  - type: "text"
    content: "Markdown content"
```

## Key Technical Decisions

1. **Content loading via `import.meta.glob`** — Required for Vercel serverless (fs.readFileSync doesn't work)
2. **Git-based CMS** — Content changes commit to GitHub → trigger Vercel rebuild
3. **Custom OAuth** — `/api/auth/+server.ts` handles GitHub OAuth for CMS login

## Deployment Flow

```
CMS Edit → GitHub Commit → Vercel Auto-deploy → Live in ~60s
```

## Original Static Site

The `/www` folder contains the original static HTML site with 23 projects. Use as reference for migrating remaining content.

## Common Tasks

- **Add project:** Use CMS at `/admin` or create `.md` file in `src/content/projects/`
- **Add images:** Upload to `static/img/` (CMS uploads to `static/img/uploads/`)
- **Update parcours:** Edit via CMS or modify `src/content/parcours/*.yml`

