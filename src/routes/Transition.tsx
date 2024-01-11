import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PageLayout = ({ children }: { children: ReactNode }) => children;

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.3,
};

const Transition = () => {
  const { pathname } = useLocation();

  return (
    <PageLayout>
      <motion.div
        style={{ width: "100%", height: "100%" }}
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

export default Transition;
