// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import * as parserTs from "@typescript-eslint/parser";
import * as pluginTs from "@typescript-eslint/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        React: "writable",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off", // for React 17+
    },
  },
];
