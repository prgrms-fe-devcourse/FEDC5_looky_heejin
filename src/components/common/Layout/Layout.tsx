import { ReactNode } from "react";

import { NAV_HEIGHT } from "@/constants/uiConstants";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <main
      style={{
        paddingTop: `${NAV_HEIGHT}rem`,
        paddingBottom: `${NAV_HEIGHT}rem`,
        width: "100%",
        height: "100%",
      }}
      className="px-2 scrollbar-hide md:px-0 md:scrollbar-default"
    >
      {children}
    </main>
  );
};

export default Layout;
