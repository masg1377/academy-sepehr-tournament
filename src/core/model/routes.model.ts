export type TRoute = {
  path: string;
  index?: boolean;
  element: JSX.Element;
  meta?: {
    layout: string;
  };
  miniBord?: boolean;
  breadCrumb?: {
    main: { title: string; link?: string };
    secondary?: { title: string; link?: string }[];
  };
  auth?: boolean;
  permissions?: string[];
  hasBack?: boolean;
};

export type TGetLayout = {
  blank: JSX.Element;
  vertical: JSX.Element;
  horizontal: JSX.Element;
};
