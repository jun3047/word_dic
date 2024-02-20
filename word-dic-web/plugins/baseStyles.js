const plugin = require('tailwindcss/plugin');

const baseStyles = plugin(function({ addComponents }) {
  const newColors = {
      '.main-color-yellow': {
        color: 'rgba(252, 220, 63, 1)',
        '&:hover': {
          color: 'rgba(252, 220, 63, 0.8)',
        },
        '&:active': {
          color: 'rgba(252, 220, 63, 0.6)',
        },
      },
      '.main-color-orange': {
        color: 'rgba(241, 138, 0, 1)',
        '&:hover': {
          color: 'rgba(241, 138, 0, 0.8)',
        },
        '&:active': {
          color: 'rgba(241, 138, 0, 0.6)',
        },
      },
      '.main-color-red': {
        color: 'rgba(233, 76, 94, 1)',
        '&:hover': {
          color: 'rgba(233, 76, 94, 0.8)',
        },
        '&:active': {
          color: 'rgba(233, 76, 94, 0.6)',
        },
      },
      '.main-color-green': {
        color: 'rgba(163, 201, 98, 1)',
        '&:hover': {
          color: 'rgba(163, 201, 98, 0.8)',
        },
        '&:active': {
          color: 'rgba(163, 201, 98, 0.6)',
        },
      },
      '.main-color-blue': {
        color: 'rgba(106, 198, 220, 1)',
        '&:hover': {
          color: 'rgba(106, 198, 220, 0.8)',
        },
        '&:active': {
          color: 'rgba(106, 198, 220, 0.6)',
        },
      },
      '.main-color-purple': {
        color: 'rgba(140, 140, 207, 1)',
        '&:hover': {
          color: 'rgba(140, 140, 207, 0.8)',
        },
        '&:active': {
          color: 'rgba(140, 140, 207, 0.6)',
        },
      },
      '.main-color-grey': {
        color: 'rgba(187, 186, 186, 1)',
        '&:hover': {
          color: 'rgba(187, 186, 186, 0.8)',
        },
        '&:active': {
          color: 'rgba(187, 186, 186, 0.6)',
        },
    }
  };

  const textSizeStyles = {
    '.headline-1': { fontSize: `${35/16}rem` },
    '.headline-2': { fontSize: `${25/16}rem` },
    '.subTitle-1': { fontSize: `${20/16}rem` },
    '.body-text': { fontSize: `${18/16}rem` },
    '.caption-1': { fontSize: `${15/16}rem` },
    '.caption-2': { fontSize: `${12/16}rem` },  
  };

  addComponents(newColors);
  addComponents(textSizeStyles);
});

module.exports = baseStyles;