export const convertToFixed = (coef: string) => {
  if (coef === "--" || !coef.includes(".")) {
    return coef;
  }
  const coefGroups = coef.match(/(?<first>\d*)\.(?<second>\d*)/)!.groups as {
    first: string;
    second: string;
  };

  const secondCoef =
    coefGroups.second.length > 1
      ? `${coefGroups.second[0]}${coefGroups.second[1]}`
      : `${coefGroups.second[0]}`;

  const newCoef = `${coefGroups.first}.${secondCoef}`;
  return newCoef;
};
