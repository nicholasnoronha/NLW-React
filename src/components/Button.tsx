// type ButtonProps = {
//   children?: string; // ? === optional // todo conteúdo de um componente react se chama children
// };

// //named export (without defalt)
// export function Button(props: ButtonProps) {
//   return <button>{props.children || "Defalt"}</button>;
// }

import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="button" {...props} />;
}
