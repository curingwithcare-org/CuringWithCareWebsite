import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**", "src/shared/DO_NOT_DELETE.js"],
  },
];

export default eslintConfig;
