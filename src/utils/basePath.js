// src/utils/basePath.js
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (path) => `${BASE_PATH}${path}`;
