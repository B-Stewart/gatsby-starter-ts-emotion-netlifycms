export interface IFluidImage {
  base64: string;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcSetType: string;
  sizes: string;
  originalImg: string;
}
// TODO: Rename this to file
export interface IChildImageSharpFluid {
  childImageSharp: {
    fluid: IFluidImage;
  };
  publicURL: string;
  extension: string;
}

export interface IFileUpload {
  publicURL: string;
}

export enum Variants {
  primary = "primary",
  secondary = "secondary",
}
