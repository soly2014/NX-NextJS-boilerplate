const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind.config.js')],
  content: [
    join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, '../../libs/ui/src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, '../../libs/teams-call-chat/src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, '../../libs/pages/src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 8px 0px rgba(123, 123, 123, 0.18)',
      },
    },
  },
  plugins: [],
};
