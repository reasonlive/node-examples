import Image from "next/image";

import { verifyUser } from "~/entities/user";
import { LogoWhiteIcon } from "~/shared/assets";

import { Button } from "~/shared/ui";
import { Content } from "./Content";
import styles from "./Navigation.module.css";

export const Navigation = async () => {
  const isAuth = await verifyUser();

  return (
    <nav className={styles.Navigation}>
      <Button elementType="link" href="/">
        <Image
          alt="Go to home page"
          className={styles.logo}
          height={15}
          src={LogoWhiteIcon}
          width={100}
        />
      </Button>

      <Content isAuth={isAuth} />
    </nav>
  );
};
