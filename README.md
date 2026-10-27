# Ayush Kumar Mishra — Premium Personal Portfolio Website

A production-ready, high-performance personal developer portfolio website for **Ayush Kumar Mishra**, Web Developer & SEO Executive. Built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript** without any external UI frameworks or build steps.

![Portfolio Banner](assets/images/og-preview.svg)

---

## 🚀 Live Demo & Repository

- **Developer:** Ayush Kumar Mishra
- **Role:** Web Developer & SEO Executive
- **Location:** Lucknow, Uttar Pradesh, India
- **Email:** [amsp78810@gmail.com](mailto:amsp78810@gmail.com)
- **Phone:** [+91 9794307570](tel:+919794307570)
- **GitHub:** [https://github.com/imayush36](https://github.com/imayush36)
- **LinkedIn:** [https://www.linkedin.com/in/ayush-mishra-2281a6305/](https://www.linkedin.com/in/ayush-mishra-2281a6305/)

---

## 📁 Project Architecture

```
portfolio/
├── index.html                   # Semantic HTML5 single-page structure
├── css/
│   └── style.css               # Vanilla CSS3 design system (Black & Red theme)
├── js/
│   └── script.js               # Vanilla JS interactions (typing, scrollspy, contact validation)
├── assets/
│   ├── images/
│   │   └── og-preview.svg      # Open Graph social sharing banner
│   ├── icons/
│   │   └── favicon.svg         # AM Monogram vector favicon
│   └── Ayush_Mishra_Resume.pdf # Target path for official resume PDF (see below)
└── README.md                   # Documentation and deployment guide
```

---

## 📄 Official Resume Integration
 
The official resume PDF has been integrated and verified at:
```
assets/Ayush_Mishra_Resume.pdf
assets/Ayush_Kumar_Mishra_Resume.pdf
```
 
### Access Points on the Portfolio:
- **Header Navigation:** "Resume" button with direct PDF download.
- **Hero Section:** "Download Resume" prominent action button in the main CTA group.
- **About Me Section:** "Download Resume (PDF)" and "View PDF" links.
- **Contact Section:** Official Curriculum Vitae card with **"Download Resume (PDF)"** and **"Quick Preview Online"** buttons.
- **Interactive Resume Modal:** Allows visitors to preview the complete PDF in a full-screen dark modal without leaving the page, with print, open-in-tab, and download controls.
- **Footer Navigation:** Direct download link under the site index.

---

## 🎨 Design System & Color Palette

The portfolio features a curated dark developer theme with high contrast, sharp red accents, and subtle glowing atmospheric effects:

| Variable | Color Code | Purpose |
| :--- | :--- | :--- |
| `--bg-main` | `#080808` | Primary background color |
| `--bg-secondary` | `#111111` | Secondary section background |
| `--bg-card` | `#161616` | Card and component surface |
| `--bg-card-hover` | `#1c1c1c` | Interactive card hover state |
| `--accent-red` | `#FF5757` | Luminous light-red for highlights & CTAs |
| `--accent-red-hover` | `#FF7373` | Hover state for buttons and links |
| `--text-main` | `#FFFFFF` | Primary high-contrast typography |
| `--text-secondary`| `#B3B3B3` | Body copy and descriptions |
| `--text-muted` | `#737373` | Metadata, tags, and timestamps |
| `--border-color` | `#292929` | Sleek dark borders |

---

## 🛠️ Features Included

1. **Sticky & Responsive Navigation:**
   - Minimalist "AM" branding with red dot.
   - Dynamic active section scrollspy.
   - Blur backdrop filter on scroll.
   - Accessible mobile drawer menu with auto-close on selection.

2. **Hero Section:**
   - Dynamic animated role cycling: *Web Developer* → *Frontend Developer* → *UI-Focused Developer*.
   - Availability status indicator: "Open to Web Development Opportunities".
   - Dual action CTAs ("Explore My Work" and "Contact Me").
   - Code terminal visual window featuring developer profile object.

3. **About Me:**
   - Professional summary reflecting ongoing industry experience at Shine Infosolutions since August 2026.
   - Clean developer facts card verifying location, education, and credentials.

4. **Technical Skills:**
   - Grouped into 5 clear categories:
     - *Frontend Development* (HTML5, CSS3, JavaScript, React.js, Next.js, Responsive Design)
     - *Styling & Animation* (Bootstrap, Tailwind CSS, Flexbox, CSS Grid, Framer Motion, GSAP)
     - *Programming* (Python - clearly badged as Basic)
     - *Database* (MongoDB, MySQL)
     - *Tools & Platforms* (GitHub, Netlify, Vercel, VS Code, Antigravity)
   - No arbitrary progress bars or fake proficiency percentages.

5. **Work Experience:**
   - Vertical timeline card with light-red marker and glowing accent.
   - Verified details: **Web Developer Intern** at **Shine Infosolutions** (August 2026 – Present, Active/Ongoing).
   - Key responsibilities & technology tags.

6. **Featured Projects:**
   - **Pulse Heart Centre Website** (Live: `https://www.pulseheartcentre.in/` | Tech: Next.js)
   - **Hotel Amara Website** (Live: `https://www.hotelamara.in/` | Tech: HTML5, CSS3, JavaScript)
   - Styled inside browser window frames with realistic previews and verified live URLs.

7. **Academic Education:**
   - BCA from Shri Ramswaroop Memorial University, Lucknow (Graduated: 2026).
   - Senior Secondary Class XII (PCM) from SMT J R DEVI K I C MATHIYA P T, Kushinagar (2022).
   - Secondary Class X from S K I CSEMARA KATHKUIYA, Kushinagar (2020).

8. **Contact & Communication:**
   - Direct clickable email, phone, location, and social links.
   - Accessible contact form with validation for name, email format, subject, and message.
   - Client-side `mailto:` generator that pre-populates the visitor's email client directly to `amsp78810@gmail.com`.
   - Resume download trigger button.

9. **Performance, SEO & Accessibility:**
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
   - Open Graph and Twitter Card metadata.
   - Respects `prefers-reduced-motion`.
   - Keyboard accessible with `:focus-visible` outlines.

---

## 💻 Local Development & Preview

### Option A: VS Code Live Server
1. Open the project folder in **Visual Studio Code**:
   ```bash
   code .
   ```
2. Install the **Live Server** extension (by Ritwick Dey) if not already installed.
3. Right-click on `index.html` and select **"Open with Live Server"** (or click "Go Live" in the status bar).
4. The website will open in your default browser at `http://127.0.0.1:5500`.

### Option B: Local Python HTTP Server
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option C: Node.js `npx serve`
```bash
npx -y serve .
```

---

## 🌐 Deployment Instructions

### Deploying to Netlify (Free & Instant)
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the root `portfolio/` folder directly into the Netlify Sites dashboard.
3. Your site will be published immediately with a global CDN and HTTPS.

Alternatively, connect your GitHub repository:
- **Build command:** *(leave empty)*
- **Publish directory:** `.`

### Deploying to Vercel
1. Install Vercel CLI (optional) or push to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/):
   - Import your GitHub repository (`imayush36/portfolio`).
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - Click **Deploy**.

---

## 📝 License & Attribution
Designed and built for **Ayush Kumar Mishra** &copy; 2026. All rights reserved.
