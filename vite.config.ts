import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const config = defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	fmt: {
		useTabs: true,
		tabWidth: 2,
		printWidth: 80,
		singleQuote: false,
		jsxSingleQuote: false,
		quoteProps: "as-needed",
		trailingComma: "all",
		semi: true,
		arrowParens: "always",
		bracketSameLine: false,
		bracketSpacing: true,
		ignorePatterns: [
			"**/src/routeTree.gen.ts",
			"**/src/styles.css",
			// Generated outputs: reformatting these churns on every regen
			// (`wrangler types`, `drizzle-kit generate`), so keep them out of `vp fmt`.
			"worker-configuration.d.ts",
			"drizzle/**",
			// Scaffold metadata: historical record of the project generator options.
			".cta.json",
		],
	},
	lint: {
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
	resolve: { tsconfigPaths: true },
	plugins: lazyPlugins(() => [
		devtools(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	]),
});

export default config;
