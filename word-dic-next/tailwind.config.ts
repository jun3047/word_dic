import type { Config } from "tailwindcss";

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      ...Array.from({ length: 2000 }, (_, i) => i).reduce((acc, px) => {
        acc[`${px}r`] = pxToRem(px);
        return acc;
      }, {} as { [key: string]: string })
    },
    extend: {
      borderWidth: {
        '1': '1px',
      },
      colors: {
        'title-1': '#fafafa',
        'title-2': '#d5d5d5',
        'bg': '#262626',
        'c-grey': {
          20: '#fafafa',
          40: '#d5d5d5',
          50: '#9b9b9b',
          60: '#636363',
          70: '#404040',
          90: '#262626',
        },
        'c-red': {
          40: '#f0b0b7',
          50: '#f05e6f',
          60: '#c24150',
        },
        'c-orange': {
          40: '#d8b179',
          50: '#e3880d',
          60: '#af6603',
        },
        'c-yellow': {
          40: '#edd59a',
          50: '#eed453',
          60: '#cdb335',
        },
        'c-green': {
          40: '#bacb9f',
          50: '#8eb944',
          60: '#66882c',
        },
        'c-blue': {
          40: '#a8c7cc',
          50: '#5ea8ba',
          60: '#448a9b',
        },
        'c-purple': {
          40: '#e2cde5',
          50: '#b18ccf',
          60: '#61619b',
        },
        'c-w_grey': {
          40: '#d0d0d0',
          50: '#bbbaba',
          60: '#8a8a8a',
        },
        'yellow-main-color': '#B78F00',
        'orange-main-color': '#E9721B',
        'red-main-color': '#E94C5E',
        'green-main-color': '#34AA47',
        'skyblue-main-color': '#04A2B7',
        'purple-main-color': '#B375D9',
        'blue-main-color': '#768CFF',
        'grey-main-color': '#919191',
        'red-sub-color': 'rgba(248, 201, 206, 1)',
        'orange-sub-color': 'rgba(253, 214, 157, 1)',
        'yellow-sub-color': 'rgba(249, 233, 192, 1)',
        'green-sub-color': 'rgba(222, 231, 208, 1)',
        'skyblue-sub-color': 'rgba(207, 231, 235, 1)',
        'blue_sub-color': '#9FBAFF',
        'purple-sub-color': 'rgba(226, 205, 229, 1)',
        'grey-sub-color': 'rgba(230, 229, 229, 1)',
        'red_-hover-color': '#E94C5E',
        'orange_hover-color': '#E9721B',
        'yellow_hover-color': '#B78F00',
        'green_hover-color': 'rgba(199, 231, 149, 1)',
        'skyblue_hover-color': 'rgba(174, 234, 244, 1)',
        'blue-hover-color': '#768CFF',
        'purple_hover-color': '#B375D9',
        'grey_hover-color': '#919191',
        'red_pressed-color': 'rgba(151, 42, 42, 1)',
        'yellow_pressed-color': 'rgba(204, 170, 4, 1)',
        'green_pressed-color': 'rgba(98, 145, 17, 1)',
        'skyblue_pressed-color': 'rgba(13, 139, 169, 1)',
        'blue_pressed-color': '#446CD3',
        'purple_pressed-color': 'rgba(77, 77, 169, 1)',
        'grey_pressed-color': 'rgba(131, 131, 131, 1)',
        'orange_pressed-color': 'rgba(185, 92, 52, 1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('./plugins/baseStyles.ts'),
  ],
};
export default config;

/** @type {import('tailwindcss').Config} */
