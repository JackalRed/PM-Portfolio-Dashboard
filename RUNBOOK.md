# Product Portfolio Dashboard — Local Runbook

## Prereqs
- Node.js 18+ (recommended 20+)
- npm 9+ or pnpm/yarn

## Install
```bash
cd product-portfolio-dashboard
npm install
```

## Develop
```bash
npm run dev
```

This launches Vite on http://localhost:5173/ and auto-opens your browser.

## Build
```bash
npm run build
npm run preview
```

## Notes
- I removed version-suffixed imports like `@radix-ui/react-slot@1.1.2` → `@radix-ui/react-slot`. This allows normal Node resolution.
- Added TailwindCSS pipeline and mapped CSS variables to Tailwind theme so your shadcn-style components render correctly.
- Added `sonner` + `next-themes` deps to support the toaster component.
- Included `recharts` for the Chart component and `react-hook-form` for form utilities.
- All source files remain at repo root; Vite entry is `index.html` → `/main.tsx` importing `./App.tsx` and `./styles/globals.css`.
