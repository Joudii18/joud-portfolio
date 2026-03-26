# Joud's Portfolio — Documentation

## Overview

A personal portfolio website for Joud, a Software Engineering student. Built with **React 19** and **Vite 8**, styled in plain CSS using the **Bellefair** serif font.

---

## Project Structure

```
Joud's Portfolio/
├── index.html
├── vite.config.js
├── package.json
├── DOCUMENTATION.md          ← this file
└── src/
    ├── main.jsx              — React entry point
    ├── index.css             — Global reset, CSS variables, Google Font import
    ├── App.jsx               — Main component (entire single-page layout)
    ├── App.css               — All component and section styles
    └── assets/
        ├── Sparkles/         — Decorative PNG images (star, circle, sun, sparkles)
        ├── arrows&Lines/     — arrow.svg, wiggleLine.svg
        ├── contactLogos/     — GitHub and LinkedIn SVG icons
        └── ProjectsPictures/ — Screenshots for each project card
```

---

## Color Palette

| Name       | Hex       | Usage                                 |
|------------|-----------|---------------------------------------|
| Background | `#1e1e1e` | Page background, entire site          |
| Pink       | `#FFA5C5` | Explore button, pink tags, form focus |
| Green      | `#BEEBA9` | Send button, green star accents       |
| Card BG    | `#252525` | Tech stack cards, project cards, form |

These are defined as CSS custom properties in `index.css`:

```css
:root {
  --bg:       #1e1e1e;
  --pink:     #FFA5C5;
  --green:    #BEEBA9;
  --card-bg:  #252525;
  --text:     #ffffff;
  --text-muted: rgba(255,255,255,0.7);
  --border:   rgba(255,255,255,0.2);
  --font:     'Bellefair', serif;
}
```

---

## Font

**Bellefair** — imported from Google Fonts via `index.css`.

```css
@import url('https://fonts.googleapis.com/css2?family=Bellefair&display=swap');
```

---

## Page Sections

### 1. Navbar
- Fixed at the top with a frosted-glass blur background.
- Left: `whiteSparkle.png` icon + "Joud" text.
- Right: `Home`, `Projects`, `Blogs` anchor links.

### 2. Hero
- Full-viewport-height section.
- Heading hierarchy: greeting → name (`Joud`) → subtitle.
- Three icon buttons: **GitHub**, **LinkedIn**, **Email** — all `href` values are placeholders.
- Four decorative sparkle images positioned absolutely within the section.

### 3. About Me
- Short bio paragraph.
- Two bullet-point items (hobbies / current learning).

### 4. Tech Stack
- 2×2 CSS Grid of cards.
- Each card has a green `✦` accent, a title, and pill-shaped tech tags.
- Decorative: `pinkCircle.png` dot and `wiggleLine.svg` on the right side.

### 5. Projects
- "Explore More →" pink button with a flipped `arrow.svg` beside it.
- 2-column grid with deliberate vertical offset on the right column (`.horse` card has `margin-top: 4.5rem`).
- Cards: Bond · Horse Riding Database System · Meras.
- Each card shows: image, title, description, pink tech tags, link buttons.
- All project and GitHub link `href` values are placeholders.

### 6. Let's Talk (Contact)
- Simple `<form>` with `onSubmit` prevented (no backend connected yet).
- Fields: Name, Email, Message textarea.
- Send button styled in green (`--green`).
- Connects to the backend of your choice — replace `onSubmit` to wire up an email service (e.g. EmailJS, Formspree, or a custom API).

### 7. Footer
- "Designed and Developed by Joud. / Built with React."

---

## Placeholders to Fill In

Search for `#…-placeholder` in `App.jsx` to find all link placeholders:

| Placeholder                  | What to replace with                  |
|------------------------------|---------------------------------------|
| `#github-placeholder`        | Your GitHub profile URL               |
| `#linkedin-placeholder`      | Your LinkedIn profile URL             |
| `mailto:placeholder@email.com` | Your real email address             |
| `#blogs-placeholder`         | Blog page URL (when ready)            |
| `#projects-placeholder`      | Projects page URL (when ready)        |
| `#github-bond-placeholder`   | Bond project GitHub repo URL          |
| `#ios-bond-placeholder`      | Bond App Store link                   |
| `#github-horse-placeholder`  | Horse Racing DB GitHub repo URL       |
| `#meras-placeholder`         | Meras link (when live)                |

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Extending the Site

### Adding a new project card
1. Add the screenshot to `src/assets/ProjectsPictures/`.
2. Import it at the top of `App.jsx`.
3. Copy an existing `<div className="project-card …">` block and update content.
4. Assign a new CSS class and add `grid-column` / `grid-row` rules in `App.css`.

### Wiring up the contact form
Replace the `onSubmit` handler in `App.jsx` with your preferred email service. Example using **EmailJS**:

```jsx
import emailjs from '@emailjs/browser'

const handleSubmit = (e) => {
  e.preventDefault()
  emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target, 'PUBLIC_KEY')
}
// …
<form className="contact-form" onSubmit={handleSubmit}>
```

### Responsive breakpoint
The single breakpoint at `768px` in `App.css` collapses the tech grid and projects grid to a single column and hides some decorative sparkles.
