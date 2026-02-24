# PrintCraft Shop — Setup Tasks

Your shop is live at: **https://3dprints-shop.vercel.app**
GitHub repo: **https://github.com/jainapurva/printcraft-shop**

All environment variables are currently set to **placeholders**. The site loads but payments/emails won't work until you replace them with real values.

---

## Tasks to Complete

### 1. Set up Stripe (Payments)
Stripe handles checkout and order payments.

- [ ] Create a Stripe account at https://dashboard.stripe.com/register
- [ ] Go to **Developers > API Keys**
- [ ] Copy your **Publishable key** (starts with `pk_live_` or `pk_test_`)
- [ ] Copy your **Secret key** (starts with `sk_live_` or `sk_test_`)
- [ ] Go to **Developers > Webhooks > Add endpoint**
  - URL: `https://3dprints-shop.vercel.app/api/webhook`
  - Events to listen for: `checkout.session.completed`
  - Copy the **Webhook signing secret** (starts with `whsec_`)

**Update in Vercel:**
1. Go to https://vercel.com/apurvas-projects-696899e3/3dprints-shop/settings/environment-variables
2. Update these variables:

| Variable | Value |
|----------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |

> **Tip:** Use test keys first (`pk_test_`, `sk_test_`) to verify everything works before going live.

---

### 2. Set up Gmail (Emails)
Emails (order confirmations, quote notifications) are sent via Gmail using Nodemailer.

- [ ] Enable **2-Step Verification** on the Gmail account: https://myaccount.google.com/signinoptions/two-step-verification
- [ ] Generate an **App Password**: https://myaccount.google.com/apppasswords
  - Select app: "Mail", device: "Other" (enter "PrintCraft")
  - Copy the 16-character password

**Update in Vercel:**

| Variable | Value |
|----------|-------|
| `GMAIL_USER` | Your Gmail address (e.g. `apurvajain.kota@gmail.com`) |
| `GMAIL_APP_PASSWORD` | The 16-character app password from above |
| `OWNER_EMAIL` | Your email for order notifications (optional, defaults to `apurvajain.kota@gmail.com`) |

> **Note:** Emails will be sent from the Gmail address. No domain verification needed.

---

### 3. Set Base URL
- [ ] If you add a custom domain, update `NEXT_PUBLIC_BASE_URL` to your domain (e.g., `https://printcraft.co`)
- Currently set to `https://3dprints-shop.vercel.app`

---

### 4. Set Admin Password (Optional)
The `/admin` page is protected by a password.

| Variable | Value |
|----------|-------|
| `ADMIN_PASSWORD` | Change from default `printcraft2025` to something secure |

---

### 5. Custom Domain (Optional)
- [ ] Go to Vercel project settings > **Domains**
- [ ] Add your custom domain (e.g., `shop.appysstudio.com` or `printcraft.co`)
- [ ] Update DNS records as instructed by Vercel
- [ ] Update `NEXT_PUBLIC_BASE_URL` to the new domain
- [ ] Update the Stripe webhook URL to use the new domain

---

## How to Update Environment Variables

1. Go to https://vercel.com/apurvas-projects-696899e3/3dprints-shop/settings/environment-variables
2. Click the three dots next to any variable > **Edit**
3. Replace the placeholder value with the real one
4. Click **Save**
5. **Redeploy** for changes to take effect: go to **Deployments** tab > click three dots on latest > **Redeploy**

---

## Quick Summary

| Service | What it does | Sign up |
|---------|-------------|---------|
| Stripe | Payments & checkout | https://dashboard.stripe.com/register |
| Gmail | Transactional emails | Your own Gmail account |
| Vercel | Hosting (already done) | Already set up |

---

## Current Env Vars (all placeholders)

```
STRIPE_SECRET_KEY=placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=placeholder
STRIPE_WEBHOOK_SECRET=placeholder
GMAIL_USER=placeholder
GMAIL_APP_PASSWORD=placeholder
NEXT_PUBLIC_BASE_URL=https://3dprints-shop.vercel.app
ADMIN_PASSWORD=printcraft2025
```

Replace each one with real values from the services above, then redeploy.
