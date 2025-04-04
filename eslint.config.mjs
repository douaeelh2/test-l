import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ),
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@components", "./src/components"],
            ["@api", "./src/api"],
            ["@config", "./src/config"],
            ["@utils", "./src/utils"],
            ["@styles", "./src/styles"],
            ["@app", "./src/app"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".jsx", ".tsx"] },
      ],
      "no-console": "warn",
      "no-unused-vars": "warn",
      "react/forbid-prop-types": "off",
      "react/no-array-index-key": "off",
      "import/prefer-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "class-methods-use-this": "off",
      "react-hooks/exhaustive-deps": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": [2, { caseSensitive: false }],
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
