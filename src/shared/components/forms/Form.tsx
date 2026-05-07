import { FormHTMLAttributes } from "react";
import clsx from "clsx";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: Props) {
  const { className } = props;

  return (
    <form {...props} className={clsx("mt-8 space-y-1", className)}>
      {props.children}
    </form>
  );
}
