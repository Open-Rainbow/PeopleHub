export const CHIP_VARIANTS = [
  'green',
  'darkGrey',
  'lightGrey',
  'darkBlue',
  'lightBlue',
  'purple',
  'red',
  'amber',
  'white',
  'darkGreen',
  'darkRed',
  'pink',
  'darkPink',
  'brown',
  'yellow',
] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];

export type ChipPalette = {
  text: string;
  background: string;
};

export const CHIP_VARIANT_PALETTE: Record<ChipVariant, ChipPalette> = {
  green: { text: '#347058', background: '#CEF0E0' },
  darkGrey: { text: '#FFFFFF', background: '#7C7C7C' },
  lightGrey: { text: '#000000', background: '#EBEBEB' },
  darkBlue: { text: '#346D9E', background: '#96DEFF' },
  lightBlue: { text: '#346D9E', background: '#D7EEFB' },
  purple: { text: '#473C82', background: '#ECE9FC' },
  red: { text: '#A10A0A', background: '#F9D5D5' },
  amber: { text: '#824300', background: '#FFBE78' },
  white: { text: '#111111', background: '#FFFFFF' },
  darkGreen: { text: '#155453', background: '#D0F0F2' },
  darkRed: { text: '#FCEDF4', background: '#840440' },
  pink: { text: '#840440', background: '#FCEDF4' },
  darkPink: { text: '#610B0B', background: '#FFC9E0' },
  brown: { text: '#633105', background: '#F5EBDF' },
  yellow: { text: '#633105', background: '#F8F8A9' },
};