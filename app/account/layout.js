import React, { Suspense } from "react";
import SideNavigation from "../_components/SideNavigation";
import Spinner from "../_components/Spinner";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation></SideNavigation>

      <div className="py-1">{children}</div>
    </div>
  );
}

export default layout;
