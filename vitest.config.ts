/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'



export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		maxConcurrency: 20,
		clearMocks: true,
		reporters: ['verbose'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/e2e-tests/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
		],
	},
})
