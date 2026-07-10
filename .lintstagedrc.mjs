/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["biome format --write --no-errors-on-unmatched"],
  "*.{mdx,json,css}": ["biome format --write --no-errors-on-unmatched"],
};

export default lintStagedConfig;
