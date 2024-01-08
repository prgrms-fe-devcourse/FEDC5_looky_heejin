import { NAV_HEIGHT } from "@/constants/uiConstants";
import { ReactNode } from "react";

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
    >
      {children}
    </main>
  );
};

export default Layout;
