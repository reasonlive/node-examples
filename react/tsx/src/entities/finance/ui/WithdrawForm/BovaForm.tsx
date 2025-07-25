"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useReadLocalStorage } from "usehooks-ts";

import { getSpb } from "~/entities/finance/api/getSpb";
import { components } from "~/shared/api";
import { ArrowIcon } from "~/shared/assets";
import {
  Button,
  Input,
  LoadingSpinner,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui";

import { withdraw } from "../../api";
import styles from "./BovaForm.module.css";

type DepositDto = components["schemas"]["BovaPaymentSystemWithdrawDto"];

const methods = [
  { label: "Карта", value: "card" },
  { label: "СБП", value: "sbp" },
];

export const BovaForm = () => {
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: string;
  }>({ label: "Карта", value: "card" });
  const { isPending, mutateAsync } = useMutation({
    mutationFn: withdraw,
  });
  const { data: banks } = useQuery({
    queryFn: getSpb,
    queryKey: ["spb"],
  });
  const [selectBank, setSelectBank] = useState<{
    id: string;
    name: string;
  }>(banks?.list[0] || { id: "100000000111", name: "Сбер" });
  const [error, setError] = useState<string>("");
  const defaultCurrency = useReadLocalStorage<string>("currency");
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<DepositDto>({
    defaultValues: {
      currency: defaultCurrency ?? "USD",
    },
  });
  const onSubmit = async (dto: DepositDto) => {
    const { data, error } = await mutateAsync({
      ...dto,
      bank: selectBank.id,
      method: selectValue.value,
    });

    if (data as any) {
    } else if (error) {
      setError(error?.message);
    }
  };
  const quickSet =
    (amount: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setValue("amount", amount);
    };

  return (
    <form className={styles.BovaForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.heading}>{`Вывод`}</h2>
      <Select
        onValueChange={(event) =>
          setSelectValue(
            methods.find((method) => method.value === event) as {
              label: string;
              value: string;
            },
          )
        }
        value={selectValue.value}
      >
        <SelectTrigger className={`${styles.select}`}>
          <SelectValue className={styles.selectValue}>
            {selectValue.label}
          </SelectValue>
          <ArrowIcon className={styles.arrowIcon} />
        </SelectTrigger>
        <SelectContent className={styles.selectContent}>
          {methods.map((method) => (
            <SelectItem
              className={styles.selectItem}
              key={method.value}
              value={method.value}
            >
              {method.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {banks?.list?.length > 0 ? (
        <Select
          onValueChange={(event) =>
            setSelectBank(
              banks?.list.find((method) => method.id === event) as {
                id: string;
                name: string;
              },
            )
          }
          value={selectBank?.id}
        >
          <SelectTrigger className={`${styles.select}`}>
            <SelectValue className={styles.selectValue}>
              {selectBank?.name}
            </SelectValue>
            <ArrowIcon className={styles.arrowIcon} />
          </SelectTrigger>
          <SelectContent className={styles.selectContent}>
            {banks?.list.map((method) => (
              <SelectItem
                className={styles.selectItem}
                key={method.id}
                value={method.id}
              >
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      <Input
        {...register("amount", {
          min: 2000,
          required: true,
          setValueAs: Number,
          validate: (value) => !!value && value > 0,
        })}
        className={styles.input}
        label={`Сумма`}
        placeholder={`Введите сумму снятия`}
        type="number"
      />
      <div className={styles.quickSetAmount}>
        <Button
          className={styles.quickSetAmountButton}
          onClick={quickSet(2000)}
        >{`2000`}</Button>
        <Button
          className={styles.quickSetAmountButton}
          onClick={quickSet(5000)}
        >{`5000`}</Button>
        <Button
          className={styles.quickSetAmountButton}
          onClick={quickSet(10000)}
        >{`10000`}</Button>
      </div>
      {errors && errors.amount ? (
        <p className={styles.error}>{`Минимальная сумма - 2000`}</p>
      ) : null}
      <Input
        {...register("wallet", {
          required: true,
          setValueAs: String,
          validate: (value) =>
            !!value && Number(value) > 0 && value.length >= 6,
        })}
        className={styles.input}
        label={`Номер кошелька`}
        placeholder={`Введите номер кошелька`}
        type="number"
      />
      {errors && errors.wallet ? (
        <p className={styles.error}>{`Некоректный номер кошелька`}</p>
      ) : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <Button className={styles.submit} disabled={isPending} type="submit">
        {`Вывести`}
        {isPending && <LoadingSpinner className={styles.loader} />}
      </Button>
    </form>
  );
};
