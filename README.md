# Curing with Care Website

Source code for the official Curing with Care website.

Built with Next.js 16 (Pages Router), Tailwind CSS 4, and Supabase, and deployed on Vercel.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a file named `.env.local` in the project root with the Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values are available in the Supabase dashboard under Project Settings → API. Do not commit this file.

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Before opening a pull request, check for lint errors and make sure the production build passes:

```bash
npm run lint
npm run build
```

Requires Node.js 22 or newer.

## Project Structure

```
components/   Shared UI components
images/       Image assets
pages/        Page routes
public/       Static files served as-is
src/shared/   Navbar, Button, and other components used across pages, plus global CSS
src/utils/    Helpers, including the shared Supabase client
styles/       CSS modules and global stylesheets
```

## Deployment

The site deploys automatically through Vercel. Every push to `main` triggers a production build, and every other branch gets its own preview deployment. Environment variables for production are managed in the Vercel project settings.

## Contributing

1. Create a new branch from `main`.
2. Make your changes and test them locally with `npm run dev`.
3. Open a pull request with a short summary of what changed.

Please don't push directly to `main` unless the change has been reviewed.

## Contact

For access or questions about the website, reach out to the Curing with Care technology team.
