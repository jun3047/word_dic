/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 이 경로에 tailwind를 사용
  theme: {
    spacing: {
      ...Array.from({ length: 2000 }, (_, i) => i).reduce((acc, px) => {
        acc[`${px}r`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {
      colors: {
        'yellow-main-color':'rgba(252, 220, 63, 1)',
        'orange-main-color':'rgba(241, 138, 0, 1)',
        'red-main-color':'rgba(233, 76, 94, 1)',
        'green-main-color':'rgba(163, 201, 98, 1)',
        'skyblue-main-color':'rgba(106, 198, 220, 1)',
        'purple-main-color':'rgba(140, 140, 207, 1)',
        'blue-main-color':'#5980E5',
        'grey-main-color':'rgba(187, 186, 186, 1)',
        'red-sub-color':'rgba(248, 201, 206, 1)',
        'orange-sub-color':'rgba(253, 214, 157, 1)',
        'yellow-sub-color':'rgba(249, 233, 192, 1)',
        'green-sub-color':'rgba(222, 231, 208, 1)',
        'skyblue-sub-color':'rgba(207, 231, 235, 1)',
        'blue_sub-color':'#9FBAFF',
        'purple-sub-color':'rgba(226, 205, 229, 1)',
        'grey-sub-color':'rgba(230, 229, 229, 1)',
        'red_-hover-color':'rgba(233, 76, 94, 1)',
        'orange_hover-color':'rgba(241, 138, 0, 1)',
        'yellow_hover-color':'rgba(252, 220, 63, 1)',
        'green_hover-color':'rgba(199, 231, 149, 1)',
        'skyblue_hover-color':'rgba(174, 234, 244, 1)',
        'blue-hover-color':'#5980E5',
        'purple_hover-color':'rgba(198, 154, 204, 1)',
        'grey_hover-color':'rgba(200, 200, 200, 1)',
        'red_pressed-color':'rgba(151, 42, 42, 1)',
        'yellow_pressed-color':'rgba(204, 170, 4, 1)',
        'green_pressed-color':'rgba(98, 145, 17, 1)',
        'skyblue_pressed-color':'rgba(13, 139, 169, 1)',
        'blue_pressed-color':'#446CD3',
        'purple_pressed-color':'rgba(77, 77, 169, 1)',
        'grey_pressed-color':'rgba(131, 131, 131, 1)',
        'orange_pressed-color':'rgba(185, 92, 52, 1)',
      },
    },  
  },
  plugins: [
    require('./plugins/baseStyles.js'),
  ],
};