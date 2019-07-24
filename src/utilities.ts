interface IColor {
  light: string;
  base: string;
  dark: string;
}

interface IColors {
  primary: IColor;
  secondary: IColor;
  neutral: IColor;
  light: string;
  dark: string;
}

export const colors: IColors = {
  primary: {
    light: "#DF97C0",
    base: "#AD407D",
    dark: "#760E49",
  },
  secondary: {
    base: "#28957A", // 1F386B
    dark: "#05674E",
    light: "#6EC4AF",
  },
  neutral: {
    base: "#ededed",
    light: "#bdbdbd",
    dark: "#696969",
  },
  light: "#ffffff",
  dark: "#000000",
};

interface IBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const breakpoints = { sm: 576, md: 768, lg: 1050, xl: 1400 };

interface IMediaQuery {
  greaterThan: IBreakpoints;
}

export const mediaQuery: IMediaQuery = {
  greaterThan: Object.keys(breakpoints).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: `@media (min-width: ${breakpoints[curr]}px)`,
    }),
    { sm: undefined, md: undefined, lg: undefined, xl: undefined },
  ),
};

export function createSubArrays<T>(maxSize: number, bigArray: T[]): Array<T[]> {
  let subArrays: Array<T[]> = [];
  for (var i = 0; i < bigArray.length; i += maxSize) {
    subArrays.push(bigArray.slice(i, i + maxSize));
  }
  return subArrays;
}
