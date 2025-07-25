import getSymbolFromCurrency from "currency-symbol-map";

import { components } from "~/shared/api";
import { Button } from "~/shared/ui";

import { getUser } from "../../api";
import styles from "./Profile.module.css";
import { SignOut } from "./SignOut";
import { UserActions } from "./UserActions";
import { Withdraw } from "./Withdraw";

const AccountInformation = ({
  children,
  user,
}: {
  children?: React.ReactNode;
  user: components["schemas"]["UserDto"];
}) => {
  const intl = Intl.NumberFormat("ru-RU");

  return (
    <div className={styles.userInfo}>
      <h2 className={styles.userInfoTitle}>{`Информация об аккаунте`}</h2>
      <p className={styles.userInfoText}>{`Email: ${user.email}`}</p>
      <p
        className={styles.userInfoText}
      >{`Аккаунт создан: ${new Date(user.createdAt).toLocaleDateString("ru-RU")}`}</p>
      <div className={styles.money}>
        <p className={styles.userInfoText}>{`Ваш баланс:`}</p>
        {user.balances?.map((balance) => (
          <div className={styles.moneyItem} key={balance.id}>
            <p
              className={styles.userInfoText}
            >{`${getSymbolFromCurrency(balance.currencyCode)}`}</p>
            <p
              className={styles.userInfoText}
            >{`${intl.format(+balance.amount)}`}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export const Profile = async () => {
  const user = await getUser();

  if (!user) {
    return <h1>Ошибка при загрузке профиля</h1>;
  }

  return (
    <div className={styles.Profile}>
      <UserActions />

      <AccountInformation user={user}>
        <Withdraw />
        <Button
          className={styles.changePassword}
          elementType="link"
          href={"/profile/changePassword"}
        >{`Сменить пароль`}</Button>
        <SignOut />
      </AccountInformation>
    </div>
  );
};
