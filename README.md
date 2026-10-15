# Belgian Beer Café — website (static build)

Upload the **contents of this folder** to the web root of www.belgianbeercafe.com. It is plain HTML, CSS and JavaScript: no database, no build step, and it works on any host (Apache, Nginx, Netlify, Cloudflare Pages, S3 and so on).

## What is in here

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `locations/` | All-cafés page, plus one page per café (`locations/souk-madinat-jumeirah-dubai/` and so on) |
| `festive/`, `franchise/` | Festive season and franchise pages |
| `404.html` | "Page not found" page |
| `assets/fonts/` | The 12 brand fonts (WOFF2). They load for every visitor, so nobody needs the fonts installed |
| `assets/css/site.css`, `assets/js/site.js` | Styles and the small script for tabs, café finder, menu book and mobile menu |
| `assets/img/`, `assets/menu/`, `assets/og/` | Optimised WebP photos, the Souk Madinat printed menu pages, and social-share images |
| `sitemap.xml`, `robots.txt` | For Google and other search engines |
| `.htaccess` | Apache settings: HTTPS + www redirect, caching, compression, font headers |
| `site.webmanifest`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | Bart favicon and home-screen icon |

The `.htaccess` file is hidden on Mac and Windows. Make sure it is uploaded too (on Apache hosts).

## URLs

| Page | Address |
|---|---|
| Home | `/` |
| All cafés | `/locations/` |
| Souk Madinat Jumeirah, Dubai | `/locations/souk-madinat-jumeirah-dubai/` |
| Barsha Heights, Dubai | `/locations/barsha-heights-dubai/` |
| Festival City, Dubai | `/locations/festival-city-dubai/` |
| InterContinental Abu Dhabi | `/locations/intercontinental-abu-dhabi/` |
| Novotel Gate Hotel, Abu Dhabi | `/locations/novotel-gate-hotel-abu-dhabi/` |
| Yas Island, Abu Dhabi | `/locations/yas-island-abu-dhabi/` |
| Intercontinental, Doha | `/locations/intercontinental-doha/` |
| Riga, Budapest, Melbourne, Perth, Auckland, Phuket | `/locations/riga-bon-vivant/`, `/locations/budapest-mosselen/`, `/locations/melbourne-southbank/`, `/locations/perth-murray-street/`, `/locations/auckland-de-post/`, `/locations/phuket-graceland-patong/` |
| Calgary, Edmonton, Newark, Atlanta | `/locations/calgary-airport/`, `/locations/edmonton-airport/`, `/locations/newark-liberty-airport/`, `/locations/atlanta-airport/` |
| Festive | `/festive/` |
| Franchise | `/franchise/` |

## SEO already built in

- A unique title, meta description and canonical URL on every page.
- Open Graph and Twitter cards with a 1200×630 share image per page.
- Structured data (JSON-LD) that Google reads:
  - **Organization** and **WebSite** on the home page.
  - **Restaurant / BarOrPub** on every café page, with address, phone, email, opening hours, menu link and Instagram.
  - **FoodEvent** entries for the festive menu, both Christmas brunches and New Year's Eve.
  - **BreadcrumbList** on every inner page.
- One H1 per page, alt text on every photo, a visible breadcrumb trail, and internal links from every card to its café page.
- All café content (the finder, what's on, menus) is in the HTML itself, so search engines can read it. The script only shows and hides it.
- `sitemap.xml` lists all 22 pages. `robots.txt` points to it.

## Speed

- Photos are WebP in two or three sizes; each browser downloads the size it needs. Photos below the fold load lazily.
- The hero photo and the main fonts are preloaded. Fonts use `font-display: swap`, so text never stays invisible.
- CSS is minified. The logos were optimised from about 160 KB to about 50 KB each.
- The design canvas page weighed several megabytes per page. Pages here weigh roughly 100–600 KB on first load.

## Google Analytics

The tag `G-0NQGF8P1B3` is in the `<head>` of every page.

The Riga and Budapest pages serve visitors in the EU, where GDPR requires consent before analytics cookies are set. If you want to be strict about that, add a consent banner (for example Cookiebot or CookieYes) and switch on Google Consent Mode.

## After you go live

1. **Google Search Console:** add www.belgianbeercafe.com, then submit `https://www.belgianbeercafe.com/sitemap.xml`.
2. **Google Business Profiles:** set the website link of each café's profile to its own page, for example `https://www.belgianbeercafe.com/locations/souk-madinat-jumeirah-dubai/`. This is the biggest single boost for local search.
3. **Test the structured data** at https://search.google.com/test/rich-results on the home page and one café page.
4. **Font licences:** the brand fonts are commercial typefaces. Confirm that your licences cover web use (webfont embedding) before launch.

## Not on Apache?

- **Nginx:** set `error_page 404 /404.html;` and add long cache headers for `/assets/`.
- **Netlify / Cloudflare Pages:** upload the folder as-is. Clean URLs and `404.html` work automatically.
