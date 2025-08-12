// colors.ts - All 64 CSS colors as TypeScript constants

export const colors: Record<string, string> = {
    // Basic Colors
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
  
    // Blue Variations
    blanchedalmond: '#FFEBCD',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    cornflowerblue: '#6495ED',
    darkblue: '#00008B',
    deepskyblue: '#00BFFF',
    dodgerblue: '#1E90FF',
    lightblue: '#ADD8E6',
  
    // Brown Variations
    brown: '#A52A2A',
    burlywood: '#DEB887',
    chocolate: '#D2691E',
    peru: '#CD853F',
    rosybrown: '#BC8F8F',
    saddlebrown: '#8B4513',
    sandybrown: '#F4A460',
    tan: '#D2B48C',
  
    // Coral & Orange
    cadetblue: '#5F9EA0',
    coral: '#FF7F50',
    darkorange: '#FF8C00',
    orange: '#FFA500',
    orangered: '#FF4500',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    salmon: '#FA8072',
  
    // Green Variations
    chartreuse: '#7FFF00',
    darkgreen: '#006400',
    forestgreen: '#228B22',
    green: '#008000',
    greenyellow: '#ADFF2F',
    lightgreen: '#90EE90',
    lime: '#00FF00',
    limegreen: '#32CD32',
  
    // Gray & Silver
    darkgray: '#A9A9A9',
    darkslategray: '#2F4F4F',
    dimgray: '#696969',
    gray: '#808080',
    lightgray: '#D3D3D3',
    lightslategray: '#778899',
    silver: '#C0C0C0',
    slategray: '#708090',
  
    // Purple & Pink
    crimson: '#DC143C',
    fuchsia: '#FF00FF',
    hotpink: '#FF69B4',
    magenta: '#FF00FF',
    mediumorchid: '#BA55D3',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    purple: '#800080',
  
    // Yellow & Gold
    gold: '#FFD700',
    goldenrod: '#DAA520',
    khaki: '#F0E68C',
    lightyellow: '#FFFFE0',
    moccasin: '#FFE4B5',
    palegoldenrod: '#EEE8AA',
    wheat: '#F5DEB3',
    yellow: '#FFFF00'
  } as const;
  
// Type for color names
export type ColorName = keyof typeof colors;
  
  // Helper function to get a color value
  export const getColor = (name: ColorName): string => colors[name];
  
  // Helper function to get all color names
  export const getColorNames = (): ColorName[] => Object.keys(colors) as ColorName[];
  
  // Helper function to get all color values
  export const getColorValues = (): string[] => Object.values(colors);
  
  // Default export
  export default colors;