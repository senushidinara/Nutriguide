import { ThemeName } from './types';

type ColorPalette = Record<string, string>;
type FontPalette = Record<string, string>;

interface Theme {
    colors: ColorPalette;
    fonts: FontPalette;
    background: string;
}

export const themes: Record<ThemeName, Theme> = {
  emerald: {
    colors: {
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
    fonts: {
        '--font-family-sans': "'Manrope', sans-serif",
        '--font-family-serif': "'Lora', serif",
    },
    background: 'linear-gradient(135deg, rgb(248 250 252) 0%, rgb(236 252 241) 100%)'
  },
  sapphire: {
    colors: {
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
    fonts: {
        '--font-family-sans': "'Manrope', sans-serif",
        '--font-family-serif': "'Lora', serif",
    },
    background: 'linear-gradient(135deg, rgb(239 246 255) 0%, rgb(219 234 254) 100%)'
  },
  ruby: {
    colors: {
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
    fonts: {
        '--font-family-sans': "'Manrope', sans-serif",
        '--font-family-serif': "'Lora', serif",
    },
    background: 'linear-gradient(135deg, rgb(254 242 242) 0%, rgb(254 226 226) 100%)'
  },
  amethyst: {
    colors: {
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
    fonts: {
        '--font-family-sans': "'Manrope', sans-serif",
        '--font-family-serif': "'Lora', serif",
    },
    background: 'linear-gradient(135deg, rgb(245 243 255) 0%, rgb(233 213 255) 100%)'
  },
  solaris: {
    colors: {
        '--color-background': '255 251 235',
        '--color-surface': '255 255 255',
        '--color-primary': '245 158 11',
        '--color-primary-hover': '217 119 6',
        '--color-secondary': '180 83 9',
        '--color-accent': '254 229 174',
        '--color-text-primary': '28 25 23',
        '--color-text-secondary': '68 64 60',
        '--color-text-muted': '120 113 108',
        '--color-border-color': '253 230 138',
    },
    fonts: {
        '--font-family-sans': "'Lora', serif", // Use serif as main font
        '--font-family-serif': "'Manrope', sans-serif", // Sans as secondary
    },
    background: 'linear-gradient(135deg, rgb(255 251 235) 0%, rgb(253 230 138) 100%)'
  },
  nocturne: {
    colors: {
        '--color-background': '17 24 39',
        '--color-surface': '31 41 55',
        '--color-primary': '29 78 216',
        '--color-primary-hover': '37 99 235',
        '--color-secondary': '59 130 246',
        '--color-accent': '55 65 81',
        '--color-text-primary': '245 245 245',
        '--color-text-secondary': '209 213 219',
        '--color-text-muted': '156 163 175',
        '--color-border-color': '55 65 81',
    },
    fonts: {
        '--font-family-sans': "'Manrope', sans-serif",
        '--font-family-serif': "'Lora', serif",
    },
    background: 'linear-gradient(135deg, rgb(17 24 39) 0%, rgb(31 41 55) 100%)'
  },
};
