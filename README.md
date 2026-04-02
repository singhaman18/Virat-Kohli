# 🏏 Virat Kohli — King Kohli Portfolio

A cinematic single-page dark portfolio for Virat Kohli built with React, TypeScript, Vite, Tailwind CSS, GSAP, and Framer Motion.

## ✨ Features

- **Cinematic Loading Screen** — Animated counter, rotating words, and progress bar with Kohli's image as backdrop
- **Hero Section** — Full-viewport video background with GSAP entrance animations and cycling roles
- **Career Timeline** — Interactive timeline layout with milestone cards (2008–2017)
- **Records & Achievements** — Stylized cards with hover effects and gradient accents
- **Iconic Moments Gallery** — Parallax scroll gallery with hover reveal text
- **Animated Stats** — Count-up numbers triggered on scroll (80+ centuries, 25,000+ runs)
- **Footer** — Marquee text, social links, and background image
- **Smooth Scroll Navigation** — Fixed navbar with smooth scroll to all sections
- **Scroll Reveal Animations** — GSAP-powered fade/slide animations on scroll
- **Responsive Design** — Mobile-first, works across all breakpoints
- **Framer Motion Page Transitions** — Fade-in after loading screen

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Fast dev server and build
- **Tailwind CSS v3** — Utility-first styling with custom theme
- **GSAP** — Scroll animations, parallax, entrance effects
- **Framer Motion** — Page transitions
- **Vitest** — Unit testing

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/       # All UI components
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── CareerSection.tsx
│   ├── RecordsSection.tsx
│   ├── MomentsSection.tsx
│   ├── StatsSection.tsx
│   ├── FooterSection.tsx
│   └── MainPage.tsx
├── hooks/            # Custom React hooks
│   ├── useCountUp.ts
│   ├── useInView.ts
│   ├── useScrollPosition.ts
│   └── useScrollReveal.ts
├── data/             # Static content data
│   └── content.ts
├── types/            # TypeScript interfaces
│   └── index.ts
├── App.tsx           # Root with router + loading state
├── main.tsx          # Entry point
└── index.css         # Global styles, CSS variables, keyframes
```

## 📸 Media

Place your images and videos in the `public/` folder. The app references them by filename.

## 📄 License

This project is for educational and portfolio purposes.
