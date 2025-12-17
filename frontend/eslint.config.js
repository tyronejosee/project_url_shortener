import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "coverage/",
      "public/",
      "supabase/",
    ],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: { React: true, JSX: true },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      prettier,
      react: reactPlugin,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,

      // ========================
      // TypeScript Best Practices
      // ========================
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": "warn",

      // ========================
      // React Best Practices
      // ========================
      "react/react-in-jsx-scope": "off",
      "react/jsx-boolean-value": ["warn", "never"],
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ========================
      // Accessibility
      // ========================
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",

      // ========================
      // Import & Module Rules
      // ========================
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      // ========================
      // General JS Best Practices
      // ========================
      eqeqeq: ["error", "always"],
      curly: "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      "no-var": "error",
      "no-empty-function": "warn",
      "no-param-reassign": "warn",
      "no-shadow": "warn",

      // ========================
      // Prettier Integration
      // ========================
      "prettier/prettier": [
        "warn",
        {
          printWidth: 100,
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          trailingComma: "es5",
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "auto",
        },
      ],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
];
