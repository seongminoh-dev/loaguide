/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // App Router 사용 시
    "./app/**/*.{js,ts,jsx,tsx}", // App Router 디렉토리 구조에 맞는 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


