import styles from "./Head.module.css";

type HeadProps = {
  Icon: any;
  name: string;
  sport: string;
};

const createHeadFieldsRow = (fields: string[]) => (
  <div className={styles.headRow}>
    {fields.map((field) => (
      <div className={styles.oddCell} key={field}>
        {field}
      </div>
    ))}
  </div>
);

const headSportRows: { [key: string]: JSX.Element } = {
  basketball: createHeadFieldsRow([`1`, `X`, `2`, ``, `ТМ`, `ТБ`]),
  "esports.cs": createHeadFieldsRow([`1`, `2`]),
  "esports.dota2": createHeadFieldsRow([`1`, `2`]),
  hockey: createHeadFieldsRow([`1`, `X`, `2`, ``, `ТМ`, `ТБ`]),
  soccer: createHeadFieldsRow([
    `1`,
    `X`,
    `2`,
    `1X`,
    `12`,
    `X2`,
    ``,
    `ТМ`,
    `ТБ`,
  ]),
  "table-tennis": createHeadFieldsRow([`1`, `2`, ``, `ТМ`, `ТБ`]),
  tennis: createHeadFieldsRow([`1`, `2`, ``, `ТМ`, `ТБ`]),
  volleyball: createHeadFieldsRow([`1`, `2`, ``, `ТМ`, `ТБ`]),
};

export const Head: React.FC<HeadProps> = ({ Icon, name, sport }) => {
  return (
    <div className={styles.Head}>
      <div className={styles.nameCell}>
        {Icon && <Icon className={styles.sportIcon} />}
        <p className={styles.name}>{name}</p>
      </div>
      {headSportRows[sport]}
    </div>
  );
};
