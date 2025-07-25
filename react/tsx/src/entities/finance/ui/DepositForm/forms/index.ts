import { AaioForm } from "./AaioForm";
import { BovaForm } from "./BovaForm";
import { CrocoPayForm } from "./CrocoPayForm";
// import { GreengoForm } from "./GreengoForm";

export const forms: { [key: string]: () => React.JSX.Element } = {
  AaioForm,
  BovaForm,
  CrocoPayForm,
  // GreengoForm,
};
