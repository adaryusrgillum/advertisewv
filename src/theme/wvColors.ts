// West Virginia Flag & State Color Palette
// Official WV Colors: Old Gold & Blue + Flag accents

export const WV = {
  // Official WV colors
  blue: '#002855',
  blueLight: '#003A70',
  blueMid: '#1A4A7A',
  blueDark: '#001A33',
  oldGold: '#FFCC00',
  goldDim: '#D4A800',
  goldBright: '#FFE44D',
  // Flag ribbon red
  red: '#C8102E',
  redLight: '#E82C4C',
  redDark: '#8B0A1F',
  // Rhododendron (state flower)
  pink: '#D42670',
  pinkLight: '#F05A9A',
  pinkDark: '#9A1548',
  // Laurel / mountain green
  green: '#2D5016',
  greenLight: '#4A7A28',
  greenDark: '#1A3009',
  // Neutrals
  white: '#F4F4F4',
  black: '#0B0C10',
  charcoal: '#1C1D21',
  grey: '#F4F4F4',
  // Gradients
  goldShimmer: 'linear-gradient(90deg, transparent, #FFCC00, transparent)',
  blueShimmer: 'linear-gradient(90deg, transparent, #002855, transparent)',
  redShimmer: 'linear-gradient(90deg, transparent, #C8102E, transparent)',
  flagGradient: 'linear-gradient(135deg, #002855 0%, #003A70 50%, #002855 100%)',
  sunsetGradient: 'linear-gradient(180deg, #C8102E 0%, #FFCC00 50%, #002855 100%)',
} as const;

export type WVColor = keyof typeof WV;
