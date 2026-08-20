// Flat ESLint config (ESLint 9+). This is where the "shared data layer"
// rule from AGENTS.md is actually enforced — see the no-restricted-syntax
// block below. This is the concrete version of "the rules are encoded in
// the tools, not in a policy document" from the Task 3 deep-dive.
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";

const FETCH_OUTSIDE_DATA_LAYER_MESSAGE =
  "Don't call fetch() directly. Add a typed function to src/lib/data/client.ts and import it instead — see AGENTS.md.";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        console: "readonly",
        fetch: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // The enforced guardrail: fetch() is banned everywhere except the
      // shared data layer file (override below turns this off there).
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='fetch']",
          message: FETCH_OUTSIDE_DATA_LAYER_MESSAGE,
        },
      ],
    },
  },
  {
    // The one file allowed to call fetch directly.
    files: ["src/lib/data/client.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  {
    files: ["**/__tests__/**", "**/*.test.{ts,tsx}", "src/setupTests.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
      },
    },
  },
  {
    // Node-side tooling scripts, not app code — different global set.
    files: ["scripts/**/*.mjs", "*.config.js", "*.config.ts"],
    languageOptions: {
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
  },
];
