import { AuthForm, verifyUser } from "~/entities/user";
import { Slider } from "~/shared/ui/Slider";

import styles from "./Header.module.css";
import { Slide3, Slide4 } from "./SlidesMock";

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = async ({ className }) => {
  const isAuth = await verifyUser();

  return (
    <header className={`${styles.Header} ${className}`}>
      {!isAuth && <AuthForm className={styles.authForm} />}
      <Slider
        className={styles.slider}
        slides={[
          // <Slide1 key={0} />,
          // <Slide2 key={1} />,
          <Slide3 key={2} />,
          <Slide4 key={3} />,
        ]}
      />
    </header>
  );
};
