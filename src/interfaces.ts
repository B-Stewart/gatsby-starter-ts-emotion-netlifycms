export interface IFluidImage {
  base64: string;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcSetType: string;
  sizes: string;
  originalImg: string;
}

export interface IChildImageSharpFluid {
  childImageSharp: {
    fluid: IFluidImage;
  };
}

export interface IFileUpload {
  publicURL: string;
}

export enum Variants {
  primary = "primary",
  secondary = "secondary",
}
