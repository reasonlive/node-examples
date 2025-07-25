import Image from "next/image";

import {
  Slide1Image,
  Slide2Image,
  Slide3Image,
  Slide4Image,
} from "~/shared/assets";
import { Button } from "~/shared/ui";

import styles from "./SlidesMock.module.css";

export const Slide1 = () => {
  return (
    <div className={styles.slide}>
      <Image
        alt="slide1"
        className={styles.slideImage}
        priority={true}
        src={Slide1Image}
      />
    </div>
  );
};

export const Slide2 = () => {
  return (
    <div className={`${styles.slide} ${styles.slide2}`}>
      <Image
        alt="slide2"
        className={`${styles.slideImage} ${styles.slide2Image}`}
        src={Slide2Image}
      />
    </div>
  );
};

export const Slide3 = () => {
  return (
    <Button
      className={`${styles.slide} ${styles.slide2}`}
      elementType="link"
      href="https://imba.bet/imba-bet.apk"
    >
      <Image
        alt="slide3"
        className={`${styles.slideImage} ${styles.slide2Image}`}
        src={Slide3Image}
      />
    </Button>
  );
};
export const Slide4 = () => {
  return (
    <div className={`${styles.slide} ${styles.slide2}`}>
      <Image
        alt="slide3"
        className={`${styles.slideImage} ${styles.slide2Image}`}
        src={Slide4Image}
      />
    </div>
  );
};
