declare module "*.svg" {
  const imageUrl: string;
  export const ReactComponent: React.SFC<any>;
  export default imageUrl;
}

declare namespace JSX {
  interface IntrinsicElements {
    "ion-icon": IoniconElement;
  }

  interface IoniconElement {
    name: string;
    class: string;
  }
}
