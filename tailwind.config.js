/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 这将确保 Tailwind 处理所有 vue 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
