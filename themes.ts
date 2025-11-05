import { ThemeName } from './types';

type ThemeColors = Record<string, string>;

export const themes: Record<ThemeName, ThemeColors> = {
  emerald: {
    '--color-background': '248 250 252',
    '--color-surface': '255 255 255',
    '--color-primary': '5 150 105',
    '--color-primary-hover': '4 120 87',
    '--color-secondary': '6 95 70',
    '--color-accent': '167 243 208',
    '--color-text-primary': '30 41 59',
    '--color-text-secondary': '71 85 105',
    '--color-text-muted': '148 163 184',
    '--color-border-color': '226 232 240',
  },
  sapphire: {
    '--color-background': '239 246 255',
    '--color-surface': '255 255 255',
    '--color-primary': '37 99 235',
    '--color-primary-hover': '29 78 216',
    '--color-secondary': '30 64 175',
    '--color-accent': '191 219 254',
    '--color-text-primary': '17 24 39',
    '--color-text-secondary': '55 65 81',
    '--color-text-muted': '107 114 128',
    '--color-border-color': '219 234 254',
  },
  ruby: {
    '--color-background': '254 242 242',
    '--color-surface': '255 255 255',
    '--color-primary': '220 38 38',
    '--color-primary-hover': '185 28 28',
    '--color-secondary': '153 27 27',
    '--color-accent': '254 202 202',
    '--color-text-primary': '17 24 39',
    '--color-text-secondary': '55 65 81',
    '--color-text-muted': '107 114 128',
    '--color-border-color': '254 226 226',
  },
  amethyst: {
    '--color-background': '245 243 255',
    '--color-surface': '255 255 255',
    '--color-primary': '124 58 237',
    '--color-primary-hover': '109 40 217',
    '--color-secondary': '91 33 182',
    '--color-accent': '221 214 254',
    '--color-text-primary': '17 24 39',
    '--color-text-secondary': '55 65 81',
    '--color-text-muted': '107 114 128',
    '--color-border-color': '233 213 255',
  },
};
