import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "coverage/**", "node_modules/**"],
  },
  ...coreWebVitals,
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
