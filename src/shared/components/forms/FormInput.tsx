import clsx from "clsx";
import { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props) {
  const { className } = props;

  return (
    <input
      {...props}
      className={clsx(
        "mt-1 border border-slate-400 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors",
        className,
      )}
    />
  );
}
