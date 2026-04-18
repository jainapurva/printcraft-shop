> # ⚠️ This repo is archived
>
> **Migrated to `jainapurva/appysstudio-website` on 2026-04-18.**
>
> All future work on appysstudio.com happens in the new repo. This repo is
> kept read-only for history only — do not push here.
>
> - **New canonical repo:** https://github.com/jainapurva/appysstudio-website
> - **Production site:** https://appysstudio.com
> - **Deploy:** push a `deploy-*` tag to the new repo (GitHub Actions → EC2)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## TODO

- [ ] User sign-in — Google/Facebook/Apple OAuth (backend ready, UI disabled)
- [ ] Color preview — let customers preview products in different filament colors before ordering
- [ ] Shipping cost — calculate shipping rates based on destination (currently zone-based estimate)
- [ ] Update product available colors — add color options to each product listing
