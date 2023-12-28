import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <main className="min-w-[100%] min-h-[100%]">{children}</main>;
};

export default Layout;
