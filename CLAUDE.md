# Appy's Studio - 3D Printing & Robotics

## Project Overview
E-commerce website for Appy's Studio — 3D printing & robotics. Built with Next.js 16 + TypeScript, deployed on AWS EC2.

## Architecture
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Auth:** NextAuth with optional Google/Facebook/Apple OAuth
- **Payments:** Square Checkout API (gracefully falls back to manual orders if unconfigured)
- **Email:** Nodemailer + Gmail (gracefully skips if GMAIL creds missing)
- **Data:** JSON file-based storage (`data/` dir) via `lib/orders.ts`
- **Styling:** Tailwind CSS, purple theme matching Appy's Studio logo

## Key Files
- `lib/email.ts` - Email with graceful no-op when creds missing
- `lib/auth.ts` - NextAuth config, providers are conditional
- `app/api/checkout/route.ts` - Square checkout, falls back without keys
- `app/api/webhook/route.ts` - Square webhook handler
- `app/api/quote/route.ts` - Custom print quote submissions

## Deployment
- **Production:** AWS EC2 (`3.238.88.157`) via `deploy_to_aws.sh`
- **Domain:** https://appysstudio.com (SSL via certbot)
- **GitHub:** `git@github-jainapurva:jainapurva/printcraft-shop.git`
- **Deploy command:** `bash deploy_to_aws.sh` (builds locally, rsyncs to EC2)
- **Server:** nginx reverse proxy → Node.js on port 3001
- **Service:** `systemctl restart 3dprints-shop`
- **SSH:** `ssh -i /media/ddarji/storage/git/free_uploader/socialAI.pem ubuntu@3.238.88.157`
- **Logs:** `sudo journalctl -u 3dprints-shop -f`
- **Vercel:** Still exists as backup at `3dprints-shop.vercel.app` (no longer primary)

## Environment Variables
All optional for testing/preview deploys:
- `SQUARE_ACCESS_TOKEN` - Square API access token (falls back to manual orders)
- `SQUARE_LOCATION_ID` - Square location ID for orders
- `SQUARE_ENVIRONMENT` - `sandbox` or `production` (defaults to sandbox)
- `SQUARE_WEBHOOK_SIGNATURE_KEY` - Square webhook signature verification
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` - Email sending (skips if missing)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` - Facebook OAuth
- `APPLE_CLIENT_ID` / `APPLE_CLIENT_SECRET` - Apple OAuth
- `ADMIN_PASSWORD` - Analytics page (defaults to `printcraft2025`)
- `NEXTAUTH_SECRET` - JWT signing (auto-generated in dev)

## Site Structure
- **3D Printing** (homepage `/`) — Products, How It Works, Custom Quote Form, FAQ
- **Robotics** (`/robotics`) — Coming Soon page
- Nav: 3D Printing | Robotics (Soon badge) | Custom Print | Support

## Recent Changes
- 2026-02-26: Site redesign — two main sections: 3D Printing + Robotics
  - Added `/robotics` Coming Soon page with robot/gear/CPU icons
  - Updated Navbar: "3D Printing" + "Robotics" (with "Soon" badge)
  - Updated Footer: "3D Printing" column + "More" column with Robotics link
  - Updated site title to "3D Printing & Robotics"
  - Stats section now shows 8 categories
- 2026-02-26: Added Swag category with 4 products (committed + deployed)
  - Appy's Studio Swag Pack (real photo)
  - Custom 3D Printed Keychain w/ optional NFC (placeholder image)
  - 3D Printed Fridge Magnets (placeholder image)
  - Custom NFC Smart Badge (placeholder image)
- 2026-02-26: Built ProductDetailModal with image carousel (committed + deployed)
  - Click any product card → full modal with image gallery, thumbnails, keyboard nav
  - Framer Motion animations, responsive layout
- 2026-02-26: Removed 'custom' from product category filter (quote form section still exists)
- 2026-02-26: Deleted unused placeholder.svg, merged PS5 listings → 16+4=20 products
- 2025-02-25: Made email gracefully skip when Gmail credentials not configured
- 2025-02-25: Added 5 new products with real product photos (9 images total)
  - Books Read This Year Tracker (decorative)
  - LOVE Lithophane Photo Lamp (gifts - new category)
  - Robot Apple Watch Charging Stand (functional)
  - PS5 Dual Controller Stand (gaming - new category)
- Added 2 new categories: Gaming, Gifts
- Product images stored locally in /public/products/ (not Unsplash)
- 2025-02-25: Replaced Vercel favicon with Appy's Studio purple logo
- 2025-02-25: Moved production from Vercel to AWS EC2

## TODO
- Replace placeholder images on 3 swag products (keychain, magnets, NFC badge)
  - Instagram logo keychain w/ NFC tag photo coming
  - Nectar brand logo NFC tag photo coming
- Replace 12 Unsplash stock images with real product photos
- Add multiple images per product for carousel support
- Commit & deploy redesign (nav, footer, robotics page)
- Add real robotics content when ready (currently Coming Soon)

## Current State
- Two-section site: 3D Printing (homepage) + Robotics (Coming Soon)
- 20 total products across 8 categories (Organizers, Cable Mgmt, Decorative, Functional, Gaming, Gifts, Swag)
- 5 products have real photos, 12 use Unsplash stock, 3 swag products use swag-box placeholder
- ProductDetailModal with image carousel live in production
- Swag products deployed to production
- Redesign (nav/footer/robotics) built locally, not yet deployed
- Production running on AWS EC2 with SSL at https://appysstudio.com
- .env on server needs Square, Gmail, NextAuth credentials configured
- Payments, email, and social login only activate when respective env vars are set
