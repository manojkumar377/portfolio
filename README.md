# Manoj - Modern Cloud & DevOps Recruiter-Focused Portfolio

A modern, high-performance portfolio website built with **Three.js**, **GSAP**, and responsive **CSS3**. Tailored specifically for technical recruiters and engineering leaders with a strong focus on privacy safety.

---

## ✨ Features

- **Hero Section**:
  - Prominent display of Name (**Manoj**) and Role (**Cloud & DevOps Engineer**).
  - Concise tagline highlighting Cloud & DevOps expertise.
  - "Contact Me" button with smooth scroll navigation to `#contact`.
  - "Download Resume" button linked to `resume.pdf` in the repository.
- **3D Background (Three.js)**:
  - Interactive rotating 3D Torus Knot with wireframe overlay.
  - Dynamic Starfield particle system with mouse parallax camera response.
  - Hardware-accelerated WebGL renderer with responsive aspect ratio updates.
- **Animations (GSAP)**:
  - Entrance animations for Hero text & call-to-action buttons.
  - `ScrollTrigger` reveal effects for cards, skills, and experience timelines.
- **Recruiter Contact Section**:
  - Privacy-safe contact details (Email: `contact@manoj.dev`, LinkedIn, GitHub).
  - Quick-copy email button with visual confirmation.
  - Interactive recruiter contact form.
- **Design & Styling**:
  - Dark theme palette with neon accent (`#ff4081`).
  - Glassmorphism UI components (`backdrop-filter: blur(16px)`).
  - Hover glow effects on links, badges, and buttons.
  - Fully responsive layout for mobile, tablet, and desktop devices.

---

## 📁 Repository Structure

```text
Portfolio_site/
├── index.html        # Main HTML structure with recruiter content & SEO meta tags
├── style.css         # Dark theme, neon accent (#ff4081), glassmorphism, responsive styles
├── script.js         # Three.js 3D background loop, GSAP ScrollTrigger, UI interactions
├── resume.pdf        # Downloadable PDF resume stored in the repository
└── README.md         # Documentation & deployment guide
```

---

## 📄 Resume Integration & Content Mapping

### How to Replace the Resume PDF
1. Generate or save your updated PDF file as `resume.pdf` in the root folder of this repository.
2. The download buttons in `index.html` are configured as:
   ```html
   <a href="resume.pdf" download="Manoj_Resume.pdf" class="btn btn-outline glow-effect">
       <i class="fas fa-download"></i> Download Resume
   </a>
   ```

### Data Mapping Comments
All personal details map cleanly inside:
- `index.html`: Hero title, role badge, tagline, contact links (`contact@manoj.dev`, LinkedIn, GitHub).
- `script.js`: `USER_CONFIG` object at the top of the file:
  ```javascript
  const USER_CONFIG = {
      name: "Manoj",
      role: "Cloud & DevOps Engineer",
      tagline: "Cloud & DevOps Enthusiast | Building Scalable, Resilient Systems",
      email: "contact@manoj.dev",
      linkedIn: "https://linkedin.com/in/manoj",
      gitHub: "https://github.com/manoj",
      resumePdfPath: "resume.pdf"
  };
  ```

---

## 🚀 GitHub Pages Deployment

This project is 100% self-contained and ready to deploy directly to **GitHub Pages**:

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern Three.js Recruiter Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select `main` branch and `/ (root)` folder, then click **Save**.
   - Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

---

## 💻 Local Preview

To preview the portfolio locally, simply open `index.html` in any modern web browser or serve it using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
