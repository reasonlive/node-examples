import { GamesBettingProvider } from "~/app/providers/GamesBetting.provider";
import { Coupon } from "~/entities/bet";
import { verifyUser } from "~/entities/user";
import "~/shared/ui/styles/index.css";

import styles from "./Main.module.css";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await verifyUser();
  return (
    <GamesBettingProvider isAuth={isAuth}>
      <main className={styles.main}>
        {children}
        <Coupon className={styles.coupon} />
      </main>
    </GamesBettingProvider>
  );
}
