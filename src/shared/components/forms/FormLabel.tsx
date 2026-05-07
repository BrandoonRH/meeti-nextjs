import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;
export default function FormLabel(props: Props) {
  const { className } = props;

  return (
    <label {...props} className={clsx("block pt-4 first:pt-0", className)}>
      {props.children}
    </label>
  );
}
