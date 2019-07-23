declare module "*.svg" {
  const imageUrl: string;
  export const ReactComponent: React.SFC<any>;
  export default imageUrl;
}
