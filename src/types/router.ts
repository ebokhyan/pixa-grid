export interface IRoute {
  pathname: string;
  element: React.FC;
  fallback: React.ReactNode | null;
  children?: IRoute[];
}
