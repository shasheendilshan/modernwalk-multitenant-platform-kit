import React from "react";

type Props = {
  children: React.ReactNode;
  name?: string;
  tenantId?: string;
};

const Layout: React.FC<Props> = ({ children, tenantId, name }) => {
  return (
    <div>
      <div className="h-[60px]  bg-red-400">{name}</div>
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
