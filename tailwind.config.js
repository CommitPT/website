/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0E14',
        'ink-light': '#151922',
        graphite: '#1F242C',
        border: '#30363D',
        muted: '#8B949E',
        'text-primary': '#F0F4F8',
        'git-add': '#07ecec',
        'git-del': '#F85149',
        'git-amber': '#F0883E',
        syntax: {
          purple: '#D2A8FF',
          green: '#7EE787',
          blue: '#79C0FF',
          gray: '#8B949E',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
