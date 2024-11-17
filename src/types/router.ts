export interface IRoute {
  pathname: string;
  element: React.FC;
  children?: IRoute[];
}
