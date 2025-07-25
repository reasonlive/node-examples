import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState<number>(global.innerWidth);
  const [height, setHeight] = useState<number>(global.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(global.innerWidth));
    window.addEventListener("resize", () => setHeight(global.innerHeight));

    return () => {
      window.removeEventListener("resize", () => setWidth(global.innerWidth));
      window.removeEventListener("resize", () => setHeight(global.innerHeight));
    };
  }, []);

  return { height, width };
};
