# HanifGold Luxury Tiling CMS

A premium tiling services portfolio website with an integrated Admin CMS, powered by React, Supabase, and Google Gemini AI.

## Features

- **Luxury Frontend**: High-end UI for showcasing services, projects, and portfolio.
- **Admin CMS**: Secure dashboard to manage content (Projects, Services, Testimonials, Blog).
- **Supabase Backend**: Real-time database and authentication.
- **AI Integration**: Google Gemini AI integration for generating marketing copy and blog posts.
- **Private Journal**: Encrypted-style private notes for business management.

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **AI**: Google Gemini API (@google/genai)
- **Build Tool**: Vite

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hanifgold-luxury-tiling
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your keys (note: The app currently uses hardcoded keys in `lib/supabaseClient.ts` for demo purposes, but you should move them here for production):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Database Schema

This project requires a Supabase project with the following tables:
- `projects`
- `services`
- `testimonials`
- `blog_posts`
- `journal_entries`
- `site_config`

See `database_schema.sql` (if exported) or the setup documentation for details.

## License

Proprietary - HanifGold Luxury Tiling.
