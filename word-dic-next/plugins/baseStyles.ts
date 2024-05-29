import plugin from 'tailwindcss/plugin';

const baseStyles = plugin(function ({ addComponents }) {
  const textSizeStyles = {
    '.headline-1': { fontSize: `${35 / 16}rem` },
    '.headline-2': { fontSize: `${25 / 16}rem` },
    '.subTitle-1': { fontSize: `${20 / 16}rem` },
    '.body-text': { fontSize: `${18 / 16}rem` },
    '.caption-1': { fontSize: `${15 / 16}rem` },
    '.caption-2': { fontSize: `${12 / 16}rem` },
  };

  addComponents(textSizeStyles);
});

export default baseStyles;