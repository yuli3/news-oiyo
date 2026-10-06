// shadcn lint — the official @shadcn/lint plugin (https://github.com/shadcn-ui/lint),
// run through ESLint over src/**/*.{astro,ts,tsx,js,jsx}.
//
//   npm run lint:shadcn        check (also part of `npm run lint` and CI)
//   npm run lint:shadcn:prune  drop baseline entries for findings you fixed
//
// news has no Tailwind and no shadcn components: it styles plain Astro markup with
// semantic class names and scoped <style> blocks. Two rules assume a Tailwind
// design system and would flag every one of those, so they are off here:
//   - shadcn/no-unknown-classes  (every semantic class is "unknown" to Tailwind)
//   - shadcn/no-inline-styles    (reports every scoped <style> block)
// The remaining rules stay on as a guard: if Tailwind utilities or shadcn
// components are ever introduced, raw palette colors, arbitrary values, dynamic
// class strings and component restyling are caught from the first commit.
// If news adopts Tailwind v4, add components.json and turn the two rules back on.
import { plugin as shadcn } from "@shadcn/lint"
import tsParser from "@typescript-eslint/parser"
import * as astroParser from "astro-eslint-parser"
import { defineConfig } from "eslint/config"

const shadcnRules = {
  "shadcn/no-restyle": ["error", { allow: ["layout"] }],
  "shadcn/no-raw-colors": "error",
  "shadcn/no-arbitrary-values": "error",
  "shadcn/require-static-classes": "error",
  "shadcn/no-unknown-classes": "off",
  "shadcn/no-inline-styles": "off",
}

export default defineConfig([
  {
    // Older eslint-disable comments name rules from linters this repo no longer runs.
    linterOptions: { reportUnusedDisableDirectives: "off" },
  },
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "public/**", "src/content/**"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { shadcn },
    rules: shadcnRules,
  },
  {
    files: ["src/**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tsParser, extraFileExtensions: [".astro"] },
    },
    plugins: { shadcn },
    rules: shadcnRules,
  },
])
