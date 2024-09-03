/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/index.{vue,js,ts}',
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',

		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,vue}",
	],
	theme: {
		extend: {}
	},
	plugins: []
} 

