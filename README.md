# Saturday Bakehouse

A simple, static marketing + ordering website for **Saturday Bakehouse**, a
small-batch weekend bakery. Five pages, no user accounts, no backend, no build
step — just HTML, CSS, and a little vanilla JavaScript.

## Pages

| Page          | File          | Purpose                                             |
| ------------- | ------------- | --------------------------------------------------- |
| Home          | `index.html`  | Hero, hours/location, featured items, order CTA     |
| Menu          | `menu.html`   | Categorized items with prices and dietary tags      |
| Order         | `order.html`  | Pickup order form (no account required)             |
| About         | `about.html`  | Story, values, and the bakers                        |
| FAQ           | `faq.html`    | Ordering, pickup, payment, dietary & allergen info  |

```
.
├── index.html · menu.html · order.html · about.html · faq.html
├── css/styles.css      # all styles (design tokens + components), no framework
├── js/main.js          # mobile nav toggle + order-form handling
└── assets/img/         # (optional) logo & photos — placeholders are CSS/emoji today
```

## Run it locally

It's plain static files — any static server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Wiring up the order form

The order form works **without any backend**. Out of the box it validates
input and — because no email endpoint is configured yet — shows a confirmation
and offers an **"Email this order"** fallback link (a pre-filled `mailto:`).
Nothing is sent over the network until you connect an endpoint.

To have orders emailed to you automatically:

1. Create a free form endpoint (e.g. [Formspree](https://formspree.io) or any
   service that accepts an HTML form `POST` and returns JSON).
2. Open `js/main.js` and set the `ENDPOINT` constant near the top of the order
   form section to your endpoint URL, e.g.:
   ```js
   var ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```
3. That's it — submissions now POST to your inbox and show an inline
   success/error message. The email fallback link stays available as a backup.

## Content to personalize

Search the project for `TODO(owner)` — these mark the real-world details to
replace before going live:

- **Hours** (currently Sat 8 AM–1 PM)
- **Address** (currently 123 Baker Street placeholder)
- **Phone / email** (currently `(555) 555-0123` / `hello@example.com` /
  `orders@example.com`) — update these in the page footers, on `order.html`, and
  the `data-to` on the "Email this order" link, plus `ENDPOINT` in `js/main.js`.
- **Menu items, prices, and dietary tags** in `menu.html` and the item list in
  `order.html` (keep the two in sync).
- **Seasonal specials**, **About story/team**, and any **allergen / cutoff /
  payment / catering** wording in `faq.html`.

## Deploying

Because it's fully static, you can host it free on GitHub Pages, Netlify,
Cloudflare Pages, or any static host — just serve the repository root.

## Notes

- Responsive and mobile-first; tested at phone, tablet, and desktop widths.
- Accessible: semantic landmarks, skip link, labelled form fields, visible
  focus states, and a native `<details>` accordion for the FAQ.
- Images are currently CSS gradients + emoji placeholders so the repo carries no
  binaries; drop real photos into `assets/img/` and swap the `.card__media` /
  `.hero__art` blocks when ready.
