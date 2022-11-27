/* eslint-disable import/no-extraneous-dependencies */

const Form = require('@tailwindcss/forms');
const daisyui = require('daisyui');

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            width: {
                95: '95%',
                90: '90%',
                85: '85%',
                80: '80%',
                70: '70%',
                60: '60%',
                40: '40%',
            },
            maxWidth: {
                95: '95%',
                90: '90%',
                85: '85%',
                80: '80%',
                70: '70%',
                60: '60%',
                40: '40%',
            },
            minHeight: {
                95: '95%',
                90: '90%',
                85: '85%',
                80: '80%',
                70: '70%',
                60: '60%',
                40: '40%',
                '95v': '95vh',
                '90v': '90vh',
                '50v': '50vh',
            },
            colors: {
                'deep-purple': {
                    50: '#ede7f6',
                    100: '#d1c4e9',
                    200: '#b39ddb',
                    300: '#9575cd',
                    400: '#7e57c2',
                    500: '#673ab7',
                    600: '#5e35b1',
                    700: '#512da8',
                    800: '#4527a0',
                    900: '#311b92',
                    'accent-100': '#b388ff',
                    'accent-200': '#7c4dff',
                    'accent-400': '#651fff',
                    'accent-700': '#6200ea',
                },

                'light-blue': {
                    50: '#e1f5fe',
                    100: '#b3e5fc',
                    200: '#81d4fa',
                    300: '#4fc3f7',
                    400: '#29b6f6',
                    500: '#03a9f4',
                    600: '#039be5',
                    700: '#0288d1',
                    800: '#0277bd',
                    900: '#01579b',
                    'accent-100': '#80d8ff',
                    'accent-200': '#40c4ff',
                    'accent-400': '#00b0ff',
                    'accent-700': '#0091ea',
                },

                'blue-gray': {
                    50: '#eceff1',
                    100: '#cfd8dc',
                    200: '#b0bec5',
                    300: '#90a4ae',
                    400: '#78909c',
                    500: '#607d8b',
                    600: '#546e7a',
                    700: '#455a64',
                    800: '#37474f',
                    900: '#263238',

                    'light-green': {
                        50: '#f1f8e9',
                        100: '#dcedc8',
                        200: '#c5e1a5',
                        300: '#aed581',
                        400: '#9ccc65',
                        500: '#8bc34a',
                        600: '#7cb342',
                        700: '#689f38',
                        800: '#558b2f',
                        900: '#33691e',
                        'accent-100': '#ccff90',
                        'accent-200': '#b2ff59',
                        'accent-400': '#76ff03',
                        'accent-700': '#64dd17',
                    },

                    'deep-orange': {
                        50: '#fbe9e7',
                        100: '#ffccbc',
                        200: '#ffab91',
                        300: '#ff8a65',
                        400: '#ff7043',
                        500: '#ff5722',
                        600: '#f4511e',
                        700: '#e64a19',
                        800: '#d84315',
                        900: '#bf360c',
                        'accent-100': '#ff9e80',
                        'accent-200': '#ff6e40',
                        'accent-400': '#ff3d00',
                        'accent-700': '#dd2c00',
                    },
                    brown: {
                        50: '#efebe9',
                        100: '#d7ccc8',
                        200: '#bcaaa4',
                        300: '#a1887f',
                        400: '#8d6e63',
                        500: '#795548',
                        600: '#6d4c41',
                        700: '#5d4037',
                        800: '#4e342e',
                        900: '#3e2723',
                    },
                },
            },

            boxShadow: {
                outline: '0 0 0 3px rgba(101, 31, 255, 0.4)',
            },
        },
    },
    daisyui: {
        themes: [
            {
                secondBuy: {
                    primary: '#ECE8DD',
                    secondary: '#ff781f',
                    accent: '#4e4e4c',
                    neutral: '#212121',
                    'base-100': '#ffffff',
                },
            },
            {
                dark: {
                    primary: '#183847',
                    secondary: '#ff781f',
                    accent: '#ddd',
                    neutral: '#212121',
                    'base-100': '#fff',
                },
            },
        ],
    },
    plugins: [daisyui, Form],
};
