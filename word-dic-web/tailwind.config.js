/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 이 경로에 tailwind를 사용
  theme: {
    spacing: {
      ...Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, px) => {
        acc[`${px}r`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {},
  },
  plugins: [],
};