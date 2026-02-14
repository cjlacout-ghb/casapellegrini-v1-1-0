# Casa Pellegrini – Antique Gallery Application

A browse-only antique gallery application inspired by premium, archival aesthetics.

## Features

- **Public Gallery**: Browse exclusive antiques with filtering by category.
- **Product Details**: High-resolution imagery and detailed specifications.
- **Contact Integration**: Direct WhatsApp links and Formspree-ready contact form.
- **Admin Dashboard**: Mock inventory management system.
- **Responsive Design**: Mobile-first approach with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with custom `cream` and `charcoal` theme.
- **Language**: TypeScript
- **Fonts**: Noto Serif (Headings) & Inter (Body) via `next/font`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Colors**: Edit CSS variables in `src/app/globals.css`.
- **Data**: Update `src/data/products.ts` with real inventory.
- **Contact Form**: Connect the form in `src/app/contacto/page.tsx` to Formspree or your backend.
