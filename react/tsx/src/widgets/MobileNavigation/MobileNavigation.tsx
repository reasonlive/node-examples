import { verifyUser } from "~/entities/user";

import { Content } from "./Content";

export const MobileNavigation = async () => {
  const isAuth = await verifyUser();

  return <Content isAuth={isAuth} />;
};
