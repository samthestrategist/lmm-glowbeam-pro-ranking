# LMM Ranking Page Golden Template

This is the **permanent golden template** for Little Miss Mineral ranking/listicle pages.  
Every new product ranking page is launched by cloning this repo — never from a previous product.

## Architecture

```
src/
  config.ts       ← ALL dynamic content lives here as {{PLACEHOLDER}} tokens
  pages/
    Index.tsx     ← Imports from config.ts, zero hardcoded product strings
  components/     ← UI components (no product strings)
```

## The Injection Workflow

### Step 1: Clone this template for a new product
```bash
git clone git@github.com:samthestrategist/lmm-ranking-golden-template.git lmm-{product-slug}-ranking
cd lmm-{product-slug}-ranking
git remote set-url origin git@github.com:samthestrategist/lmm-{product-slug}-ranking.git
```

### Step 2: Inject content + PDP URL + images
```bash
python scripts/content-inject.py --config product_config.json --target src/config.ts
python scripts/content-inject.py --pdp-url https://... --target src/config.ts
python scripts/image-inject.py --slots cdn_slots.json --target src/config.ts
```

### Step 3: Build & deploy
```bash
npm install && npm run build
```

## Config.ts Slots Reference

| Slot | Description |
|------|-------------|
| `PRODUCT_NAME` | Full product name with trademark |
| `BRAND_NAME` | Brand display name |
| `PDP_URL` | Live PDP URL — all #1 CTAs point here |
| `CHECKOUT_URL_1/2/3UNIT` | Direct cart links (optional backup CTAs) |
| `CDN_HERO_FRONT` | Product image for #1 card |
| `CDN_AD_OVERLAY` | Product image for closing CTA |
| `RANK_META_TITLE/DESC` | SEO meta tags |
| `RANK_PUBLICATION_NAME` | Editorial publication name |
| `RANK_UPDATED_DATE` | "Updated: [Month Year]" |
| `RANK_CATEGORY_HEADLINE` | Page H1 (e.g., "Best Cica Moisturizers for Women Over 40") |
| `RANK_EDITORIAL_INTRO` | Intro paragraph below H1 |
| `RANK_P1_*` | #1 product (our product) — name, description, 5 bullets, rating, discount badge |
| `RANK_P2/3/4_*` | Competitor products — name, brand, description, 3 bullets, weakness, rating |
| `RANK_FEATURE1/2/3_LABEL/DESC` | Feature highlight row (3 icons) |
| `RANK_DEEP_DIVE_H2` | Editorial deep dive H2 |
| `RANK_DEEP_DIVE_P1/2/3/4` | Deep dive paragraphs |
| `RANK_FAQ_Q1-5/A1-5` | FAQ entries |
| `RANK_TABLE_P1_*` | Comparison table data for #1 |
| `RANK_TABLE_P2/3/4_RATING/PRICE` | Comparison table data for competitors |
| `RANK_P1/2/3/4_RATING` | Numeric ratings out of 10 |
| `RANK_FINAL_CTA` | Closing CTA subheadline |
| `RANK_FINAL_CTA_SUBTEXT` | Closing CTA button label |
| `RANK_DISCLAIMER` | Footer advertiser disclosure |
| `RANK_FOOTER_DISCLAIMER_2` | Footer FDA disclaimer |

## Template Structure

The ranking page is structured as a 4-product listicle:
- **#1 (Our Product)**: Featured card with full product image, 5 bullets, discount badge, primary CTA to PDP
- **#2, #3, #4 (Competitors)**: Smaller cards, 3 bullets, weakness callout, secondary CTA
- Feature highlight row (3 icons)
- Editorial deep dive section
- FAQ section
- Comparison table
- Full-width closing CTA

## Rules

- **Competitor names (#2, #3, #4)** are product-specific — they should be real competing products in the category
- **PDP_URL** is injected after the PDP build is live
- **RANK_P2/3/4_BRAND** + external CTAs for competitors default to `#` (no affiliate links for competitors)
- Build will succeed with all `{{PLACEHOLDER}}` values

## Build Validation

```bash
npm install && npm run build
grep -r "centella\|crc-\|Centella Restore\|Skin Intelligence\|Cicapair\|COSRX\|La Roche-Posay" src/config.ts && echo "❌ CRC artifacts found" || echo "✅ Clean"
```
