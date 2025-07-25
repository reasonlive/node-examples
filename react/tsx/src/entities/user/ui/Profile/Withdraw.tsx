import { WithdrawForm } from "~/entities/finance/ui/WithdrawForm/WithdrawForm";
import { Dialog, DialogContent, DialogTrigger } from "~/shared/ui";

import styles from "./Withdraw.module.css";

export const Withdraw = async () => {
  return (
    <Dialog>
      <DialogTrigger
        className={styles.Withdraw}
      >{`Вывод средств`}</DialogTrigger>
      <DialogContent>
        <WithdrawForm />
      </DialogContent>
    </Dialog>
  );
};
