/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sara: {
          primary: '#6366f1',   // indigo — calm, focused
          accent: '#f59e0b',    // amber — energy, achievement
          bg: '#0f0f1a',        // deep dark background
          surface: '#1a1a2e',   // card surface
          border: '#2d2d4a',    // subtle borders
          text: '#e2e8f0',      // primary text
          muted: '#94a3b8',     // secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
