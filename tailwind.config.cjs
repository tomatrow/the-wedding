const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['variant', ['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)']],
	theme: {
		extend: {
			colors: {
				'base-100': '#714a33',
				primary: '#000000',
				neutral: '#d2c3a3',
				info: '#87ceeb',
				success: '#6e4e37',
				warning: '#f4a261',
				error: '#c44536'
			},
			fontFamily: {
				catherine: ['Catherine', 'sans-serif']
			}
		}
	},

	plugins: [forms, typography, daisyui]
}

module.exports = config
