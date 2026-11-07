# Rajkumar Gupta — Portfolio

Personal portfolio built with **React 18**, **Vite** and **Three.js**.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build     # outputs to /dist
npm run preview   # serve the production build locally
```

## Project structure

```
rajkumar-portfolio/
├── index.html              # page shell, fonts, meta tags
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # puts the sections together
    ├── data/
    │   └── profile.js      # ← ALL your content: name, links, skills, projects
    ├── assets/
    │   └── rajkumar.jpg    # your photo
    ├── styles/
    │   └── index.css       # colours, fonts, shared buttons/layout
    └── components/
        ├── Navbar.jsx/.css     # fixed nav, active-section highlight, mobile menu
        ├── Hero.jsx/.css       # name, intro, photo
        ├── WaveField.jsx       # Three.js animated wave
        ├── Projects.jsx/.css   # project list
        ├── ProjectCard.jsx     # one project
        ├── Skills.jsx/.css
        ├── About.jsx/.css
        ├── Contact.jsx/.css
        └── Footer.jsx
```

## Updating content

Everything you'll want to change is in `src/data/profile.js`:

- `PROFILE` — email, phone, GitHub, LinkedIn, résumé link
- `SKILLS` — skill groups
- `PROJECTS` — add, remove or reorder projects (add `url: null` for projects without a public link)

To add a résumé button, put your PDF in `public/` and set `resume: "/your-file.pdf"`.

To change the photo, replace `src/assets/rajkumar.jpg` with an image of the same name.

## Deploy

- **Vercel / Netlify:** import the repo — build command `npm run build`, output folder `dist`.
- **GitHub Pages:** set `base: "/<repo-name>/"` in `vite.config.js`, run `npm run build`, and publish `dist`.
